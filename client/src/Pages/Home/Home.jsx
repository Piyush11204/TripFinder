import React from 'react';
import "./Home.css";
import Carousel from '../../components/Carousel/Carousel';
import LocationCards from '../../components/LocationCards/LocationCards';
// import AdventureAwaits from "../../img/AdventureAwaits.png";
import Slider from '../../components/WhatCanWeDo/Slider';

const Home = () => {
  return (
    <div className="homepage">
      {/* Carousel for featured trips or destinations */}
      <Carousel />

      {/* Subheadline Section */}
      <div className="container1">
        <h1 className="SubHeadline">Destinations You'll Love to Explore</h1>
      </div>

      {/* Slogan Section */}
      {/* <div className="SloganPart">
        <h1 className="slogan">
          "Ready for your next adventure? With <span className="nameInSlogan">Tripvana</span>, exploring breathtaking destinations and uncovering hidden gems has never been easier. Let us guide you to unforgettable experiences—your dream getaway is just a click away!"
        </h1>
        <div className="Sloganimg">
          <img src={AdventureAwaits} alt="Adventure Awaits" />
        </div>
      </div> */}
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Explore the Wonders of Bali</div>
              <div className="ag-courses-item_date-box">
                Start: <span className="ag-courses-item_date">20.09.2024</span>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">European Adventure: 5 Countries in 10 Days</div>
              <div className="ag-courses-item_date-box">
                Start: <span className="ag-courses-item_date">10.10.2024</span>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Experience the Northern Lights in Norway</div>
              <div className="ag-courses-item_date-box">
                Start: <span className="ag-courses-item_date">15.11.2024</span>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Safari Adventure in Kenya</div>
              <div className="ag-courses-item_date-box">
                Start: <span className="ag-courses-item_date">05.12.2024</span>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Cruise the Mediterranean</div>
              <div className="ag-courses-item_date-box">
                Start: <span className="ag-courses-item_date">30.09.2024</span>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Explore the Ancient Ruins of Egypt</div>
            </a>
          </div>
        </div>
      </div>

      {/* Location Cards for popular destinations */}
      <LocationCards />

      
      

      
      <Slider />
    </div>
  );
};

export default Home;
