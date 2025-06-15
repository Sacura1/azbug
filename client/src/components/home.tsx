import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { format } from "date-fns";



type Post = {
    id: number;
    title: string;
    solution: string;
    image?: string;
    username:string;
    created:number;
};

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/getPosts`)
            .then(response => {
                setPosts(response.data);
                console.log("Fetched posts:", response.data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    console.log("Posts state:", posts);

 

    return (
          <div className="min-h-screen  bg-gradient-to-br from-gray-900 to-black text-white p-6">
            <div className="max-w-7xl mx-auto mt-40">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <Link 
          to={`/post/${post.id}`} 
          key={index} 
          className="block group transition-all duration-300 transform hover:-translate-y-2"
        >
          <div  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="relative pt-[60%] overflow-hidden">
              <img 
                src={`http://localhost:3000${post.image}`} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            </div>
            
            <div className="">
              <h2 className="text-xl p-3 font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h2>
            
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>
         
    );
}


export default Home;