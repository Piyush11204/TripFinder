import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Ghost } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="bg-gradient-to-br from-violet-300 to-violet-500 min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`
            }}
          >
            <Sparkles 
              className="text-violet-200 opacity-30" 
              size={20 + Math.random() * 30}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center mb-8">
          <Ghost className="w-16 h-16 sm:w-24 sm:h-24 text-white animate-bounce" />
        </div>
        
        <h1 className="text-8xl sm:text-9xl font-bold text-white mb-4 animate-pulse">
          404
        </h1>
        
        <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-6">
          Oops! Page Not Found
        </h2>
        
        <p className="text-violet-100 text-lg sm:text-xl max-w-md mx-auto mb-8">
          Looks like you've ventured into the mysterious void. 
          Don't worry, we'll help you find your way back!
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-violet-500 bg-white rounded-full shadow-lg hover:bg-violet-50 transition-all duration-300 transform hover:scale-105"
        >
          <span>Return to Home</span>
        </Link>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </div>
  );
};

export default NotFoundPage;