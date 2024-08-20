import React from 'react';
import "./Home.css";
import Carousel from '../../components/Carousel/Carousel';
import LocationCards from '../../components/LocationCards/LocationCards';
import AdventureAwaits from "../../img/AdventureAwaits.png"

const Home = () => {


  return (
    <div className="homepage">
      <Carousel />
      <h1 className='SubHeadline'>Destinations You'll Love to Explore</h1>
      <div className="SloganPart">
        <strong className='slogan'>"Explore captivating destinations, discover hidden gems, and embark on unforgettable adventures. With  <span className='nameInSlogan'>Trip Finder</span>, your next great journey is just a click away."Let us guide you to your dream getaway!</strong>
        <div className="Sloganimg">
          <img src={AdventureAwaits} alt="" />
        </div>
      </div>

      <LocationCards />

    </div>
  );
};

export default Home;
