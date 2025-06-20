import cors from 'cors'
import express from 'express';
import multer from 'multer';
import pkg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.resolve();

dotenv.config()
const { Pool } = pkg;
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: [
    'http://localhost:10000',  
    'https://www.azbug.net',
    'https://azbug-backend.onrender.com', 
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    console.log('File saved as:', uniqueName);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });


app.post('/submit', upload.single('issueImage'), async (req, res) => {
  const title = req.body.bugIssue;
  const  solution  = req.body.solution;
    const  username  = req.body.username;

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'INSERT INTO azbug (title, solution, image, username) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, solution, imagePath,username]
    );
    const assertedId = result.rows[0].id;
    res.status(200).json({ id: assertedId});
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
    try {
      console.log('Received delete request');
    const re = await pool.query('DELETE FROM azbug WHERE id = $1', [id]);
    res.status(200).send('post deleted successfully!');
    } catch (error) {
        console.error(error);}
})


app.get('/getPosts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM azbug');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM azbug WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Database error');
    }

  });




app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});