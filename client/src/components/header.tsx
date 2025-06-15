import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate()

  const form = () => {
    navigate('/newbug')
  }


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-2xl"
          : "bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between py-4">
          <div className="hidden lg:flex items-center space-x-8">
            {["Home", "Bugs & Solutions", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-blue-400 transition-all duration-300 relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-white" >Azbug</h1>
            <img className="w-11 h-11" src="./azbug.png" alt="" />
            <button
              onClick={form}
              className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Add New Bug
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              ☰
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="space-y-2">
              {["Home", "Bugs & Solutions", "About"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-white hover:text-blue-400 py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  {item}
                </a>
              ))}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg mt-4 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              onClick={form}>
                Add new Bug
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
