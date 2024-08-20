import React from 'react';
import "./Home.css";
import Carousel from '../../components/Carousel/Carousel';
import LocationCards from '../../components/LocationCards/LocationCards';

const Home = () => {
  

  return (
    <div className="homepage">
      <Carousel />
      <h1 className='SubHeadline'>Destinations You'll Love to Explore</h1>
      <LocationCards />
      
    </div>
  );
};

export default Home;
