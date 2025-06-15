import cors from 'cors';
import express from 'express';
import multer from 'multer';
import pkg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { Pool } = pkg;
const app = express();
const PORT = 3000;
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5173/',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Azbug',
    password: 'Ugwuanyi1?',
    port: 5432,
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
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });
app.post('/submit', upload.single('image'), async (req, res) => {
    const { title, solution } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Received data:', { title, solution, imagePath });
    try {
        await pool.query('INSERT INTO azbug (title, solution, image) VALUES ($1, $2, $3)', [title, solution, imagePath]);
        res.status(200).send('Post submitted successfully!');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Database error');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
