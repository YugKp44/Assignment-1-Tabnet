// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaSun, FaMoon } from 'react-icons/fa';


const Navbar = () => {
  

  return (
    <nav className="navbar bg-base-100 dark:bg-gray-900 shadow-lg px-6 py-4 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
        <FaGithub className="text-5xl text-black bg-white p-2 rounded-full" />

          <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            GitHub Finder
          </span>
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
