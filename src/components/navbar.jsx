import React from 'react';
import { useTheme } from '../ThemeContext';

const Navbar = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <nav
      className={`px-6 py-4 flex justify-between items-center transition-colors duration-300 ${
        darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black shadow-md'
      }`}
    >
      {/* Center Links */}
      <div className="flex-1 flex justify-center">
        <div className="flex gap-12 font-bold text-lg items-center">
          {/* First link always black */}
          <a href="/" className="text-black">My Portfolio</a>
          {/* Other links adjust with theme */}
          <a href="#about" className={`hover:underline font-normal ml-8 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>About</a>
          <a href="#projects" className={`hover:underline font-normal ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Projects</a>
          <a href="#contact" className={`hover:underline font-normal ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Contact</a>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded font-normal text-sm flex items-center gap-2 border transition-colors duration-300 ${
          darkTheme
            ? 'border-white text-white hover:bg-gray-800'
            : 'border-black text-black hover:bg-gray-200'
        }`}
      >
        {darkTheme ? (
          // Sun Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            <path stroke="currentColor" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        ) : (
          // Moon Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
