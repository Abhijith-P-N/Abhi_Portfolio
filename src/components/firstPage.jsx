import React from 'react';
import ProfilePic from '../assets/profile.png';
import { useTheme } from '../ThemeContext';

const FirstPage = () => {
  const { darkTheme } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-[60vh] mt-32 animate-landing">
      {/* Animated Shadow Behind Photo */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-96 h-96 rounded-full ${darkTheme ? 'bg-blue-600' : 'bg-blue-300'} opacity-40 blur-2xl animate-pulse`}></div>
        </div>
        <img
          src={ProfilePic}
          alt="Profile"
          className="relative w-80 h-80 rounded-full object-cover shadow-lg border-4 border-white"
        />
      </div>
      {/* Name and Description */}
      <div className="ml-10 flex flex-col items-start">
        <h1 className="text-2xl font-bold mb-2">Hi, I am</h1>
        <h1 className="text-4xl font-bold mb-2 text-blue-500">Abhijith PN</h1>
        <p className={`text-lg max-w-md leading-relaxed ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
          I’m a 2nd-year B.Tech Computer Science student specializing in Cybersecurity.
          I also work as a Full Stack Web Developer, building modern web applications.
          My interests include ethical hacking, secure coding, and system protection.
          I aim to create innovative and secure digital solutions for the future.
        </p>
      </div>
    </div>
  );
};

export default FirstPage;
