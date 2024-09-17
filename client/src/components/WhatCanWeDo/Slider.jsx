import React from 'react';
import './Slider.css'; 

const Slider = () => {
  return (
    <>
    <h1 className=' m-4 p-4 text-[50px] font-[800] font-[poppins] text-center '>What We Can Do For You❓</h1>
      <ul className="flex w-full m-0 h-[500px] p-0 list-none bg-gray-200">
        {/* Card 1: AI Trip Planner */}
        <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 bg bg-cover bg-center" style={{ backgroundImage: "url('https://blog.solguruz.com/wp-content/uploads/2024/05/How-to-Build-an-AI-powered-Trip-Planner-App.png')" }}>
          <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
            <h2 className="text-2xl font-semibold mb-4">AI-Powered Trip Planner</h2>
            <p>Let our AI help you create a personalized itinerary based on your preferences. Choose from destinations, activities, and experiences tailored just for you.</p>
          </div>
        </li>

        {/* Card 2: Personalized Trip Guide */}
        <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 overflow-hidden bg-cover bg-left" style={{ backgroundImage: "url('https://cdn.igp.com/f_auto,q_auto,t_pnopt19prodlp/products/p-my-personalized-travel-planner-271410-m.jpg')" }}>
          <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
            <h2 className="text-2xl font-semibold mb-4">Personalized Trip Guide</h2>
            <p>Enjoy a dedicated trip guide who helps you navigate new destinations and makes sure you get the most out of your travels, from sightseeing to hidden gems.</p>
          </div>
        </li>

        {/* Card 3: Seamless Booking */}
        <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 overflow-hidden bg-cover bg-left" style={{ backgroundImage: "url('https://cdn.hostadvice.com/2023/05/final-how-to-make-a-booking-website-0.jpeg')" }}>
          <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
            <h2 className="text-2xl font-semibold mb-4">Seamless Booking</h2>
            <p>Plan and book flights, hotels, and tours all in one place. Our platform offers easy and secure booking to make your trip planning effortless.</p>
          </div>
        </li>

        {/* Card 4: 24/7 Customer Support */}
        <li className="relative w-1/5 h-full box-border border-r border-gray-400 transition-all duration-500 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/vector-flat-design-illustration-customer-support_727932-76.jpg')" }}>
          <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
            <h2 className="text-2xl font-semibold mb-4">24/7 Customer Support</h2>
            <p>Whether you're in the planning phase or mid-trip, our support team is available round-the-clock to assist you with any travel queries.</p>
          </div>
        </li>

        {/* Card 5: Exclusive Travel Deals */}
        <li className="relative w-1/5 h-full box-border overflow-hidden bg-cover bg-center border-r-0" style={{ backgroundImage: "url('https://dcassetcdn.com/design_img/299098/146489/146489_2663252_299098_image.jpg')" }}>
          <div className="content absolute bottom-full left-0 w-full box-border text-center px-2 transition-all duration-500 delay-500 opacity-0 bg-black bg-opacity-70 text-white">
            <h2 className="text-2xl font-semibold mb-4">Exclusive Travel Deals</h2>
            <p>Gain access to exclusive deals and discounts on flights, hotels, and tour packages to help you save while exploring the world.</p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Slider;
