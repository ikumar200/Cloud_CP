import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center justify-center text-center px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-6 animate-fade-in">
        Welcome to Recipe App 🍽️
      </h1>
      <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
        Discover new recipes, save your favorites, and get cooking in seconds. <br />
        Login to start your delicious journey!
      </p>
      <Link
        to="/login"
        className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Get Started
      </Link>

      {/* Stylish summary */}
      <div className="mt-12 max-w-3xl text-gray-800 px-4 md:px-0">
        <p className="text-lg md:text-xl italic font-medium leading-relaxed text-center">
          🔥 Powered by a smart LLM cooking agent, our app crafts personalized recipes
          tailored to your ingredients and taste — making home cooking simpler, faster, and way more fun!
        </p>
      </div>
    </div>
  );
};

export default Landing;
