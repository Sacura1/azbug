import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

type Post = {
  title: string;
  image: string;
  solution: string;
  username: string;
  created: number;
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Error fetching post:', err));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
  <div className="max-w-4xl mx-auto px-4 py-12 ">
    {/* Back Button */}
    <div className="mb-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to all posts
      </Link>
    </div>

    {/* Title */}
    <h1 className="text-center mt-28 text-4xl md:text-5xl font-bold mb-9 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
      {post.title}
    </h1>
    <div className="p-2 flex  items-center mt-4 text-gray-400 text-sm">
                    <svg className="py-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
    </svg>
                        
                    <span className="flex items-center">
                      {post.username}
                      <img className="px-1"
                         src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" width="22" alt="Discord" />
    
                    </span>
                    <span className="mx-2">•</span>
                    
                    <span>{format(new Date(post.created),"MMMM d, yyy HH:mm")
                    }</span>
                  </div>

    {/* Image */}
    <div className="relative rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl mb-10">
      <div className="relative pt-[50%]">
        <img 
          src={`http://localhost:3000${post.image}`} 
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
      </div>
    </div>

    {/* Solution Content */}
    <div className="prose prose-invert max-w-none prose-lg prose-headings:text-cyan-300 prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-strong:text-cyan-200 prose-blockquote:text-gray-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg border border-gray-800 rounded-2xl p-8 bg-gray-800/20 backdrop-blur-sm">
      <div dangerouslySetInnerHTML={{ __html: post.solution }} />
    </div>
  </div>
</div>
  );
};

export default PostDetail;