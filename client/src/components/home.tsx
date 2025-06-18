import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";



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

    const navigate = useNavigate();

    const form = () => {
        navigate('/newbug')
    }

   


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/getPosts`)
            .then(response => {
                setPosts(response.data);
                
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    



 

    return (
      
          <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      
      <div className="max-w-4xl mx-auto mt-20 mb-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
            <img className="w-16 h-16" src="./azbug.svg" alt="" />
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-6">
              Community-Driven Aztec Node Error Solutions
            </p>
          </div>

          <div className="mb-8">
            <p className="text-gray-200 text-base md:text-lg leading-relaxed text-center">
              Welcome to AzBug, the collaborative platform where developers and the aztec community share fixes for Aztec node errors together. 
            
            </p>
          </div>

          <div className="mb-8">
            <div className="bg-cyan-500/10 p-6 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/15 transition-colors">
              <h3 className="text-cyan-400 text-center text-4xl md:text-3xl font-bold text- mb-2">Share Solutions</h3>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed text-center">
                Contribute fixes, workarounds that have worked for your specific use cases.
              </p>
            </div>
            
           
          </div>

          <div className="text-center">
            <button 
            onClick={form}
              
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95"
            >
              ➕ Add New Bug
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          
          {posts.map((post, index) => {
            return (
              <Link 
                to={`/post/${post.id}`} 
                key={index} 
                className="block group transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
                  <div className="relative pt-[60%] overflow-hidden">
                    <img 
                      src={`${import.meta.env.VITE_API_URL}${post.image}`} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>
                  
                  <div className="">
                    <h2 className="text-xl p-3 font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h2>
                  
                    <div className="p-2 flex items-center mt-4 text-gray-400 text-sm">
                      <svg className="py-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
                      </svg>
                          
                      <span className="flex items-center">
                        {post.username}
                        <img className="px-1"
                           src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" width="22" alt="Discord" />
                      </span>
                      <span className="mx-2">•</span>
                      
                      <span>{format(new Date(post.created),"MMMM d, yyy HH:mm")}</span>
                    </div>
                      
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
         
    );
}


export default Home;