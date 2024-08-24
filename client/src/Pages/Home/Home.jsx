import React from 'react';
import "./Home.css";
import Carousel from '../../components/Carousel/Carousel';
import LocationCards from '../../components/LocationCards/LocationCards';
import AdventureAwaits from "../../img/AdventureAwaits.png"

const Home = () => {


  return (
    <div className="homepage">
      <Carousel 
      //  responsive={responsive}
      //  swipeable={true}
      //  draggable={true}
      //  showDots={false}
      //  infinite={true}
      //  autoPlay={false}
      />
      <div className='container1'>
      <h1 className='SubHeadline'>Destinations You'll Love to Explore</h1>
      </div>
      <div className="SloganPart">
        <h1 className='slogan'>"Ready for your next adventure?  With <span className='nameInSlogan'>Tripvana</span>, exploring breathtaking destinations and uncovering hidden gems has never been easier. Let us guide you to unforgettable experiences—your dream getaway is just a click away!"</h1>
        <div className="Sloganimg">
          <img src={AdventureAwaits} alt="" />
        </div>
      </div>

      <LocationCards />

    </div>
  );
};

export default Home;
