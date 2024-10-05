import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Carousel from '../../components/Carousel/Carousel';
import LocationCards from '../../components/LocationCards/LocationCards';
import Slider from '../../components/WhatCanWeDo/Slider';

const DestinationCard = ({ title, date, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${color} rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'transform -translate-y-2 shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="/" className="block p-6 text-white h-full flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div>
          {date && (
            <p className="text-sm opacity-75 mb-2">
              Start: <span className="font-bold">{date}</span>
            </p>
          )}
          <ChevronRight className={`transition-all duration-300 ease-in-out ${isHovered ? 'translate-x-2' : ''}`} />
        </div>
      </a>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <Carousel />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center text-purple-800 mb-12 animate-fade-in">
          Destinations You'll Love to Explore
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Explore the Wonders of Bali", date: "20.09.2024", color: "bg-gradient-to-br from-green-400 to-green-600" },
            { title: "European Adventure: 5 Countries in 10 Days", date: "10.10.2024", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
            { title: "Experience the Northern Lights in Norway", date: "15.11.2024", color: "bg-gradient-to-br from-purple-400 to-purple-600" },
            { title: "Safari Adventure in Kenya", date: "05.12.2024", color: "bg-gradient-to-br from-yellow-400 to-yellow-600" },
            { title: "Cruise the Mediterranean", date: "30.09.2024", color: "bg-gradient-to-br from-red-400 to-red-600" },
            { title: "Explore the Ancient Ruins of Egypt", date: null, color: "bg-gradient-to-br from-orange-400 to-orange-600" },
          ].map((item, index) => (
            <DestinationCard key={index} {...item} />
          ))}
        </div>
      </div>
      
      <LocationCards />
      <Slider />
    </div>
  );
};

export default Home;