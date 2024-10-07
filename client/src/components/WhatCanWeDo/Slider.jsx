import React, { useState } from 'react';

const services = [
  {
    title: "AI-Powered Trip Planner",
    description: "Let our AI help you create a personalized itinerary based on your preferences. Choose from destinations, activities, and experiences tailored just for you.",
    image: "https://blog.solguruz.com/wp-content/uploads/2024/05/How-to-Build-an-AI-powered-Trip-Planner-App.png"
  },
  {
    title: "Personalized Trip Guide",
    description: "Enjoy a dedicated trip guide who helps you navigate new destinations and makes sure you get the most out of your travels, from sightseeing to hidden gems.",
    image: "https://cdn.igp.com/f_auto,q_auto,t_pnopt19prodlp/products/p-my-personalized-travel-planner-271410-m.jpg"
  },
  {
    title: "Seamless Booking",
    description: "Plan and book flights, hotels, and tours all in one place. Our platform offers easy and secure booking to make your trip planning effortless.",
    image: "https://cdn.hostadvice.com/2023/05/final-how-to-make-a-booking-website-0.jpeg"
  },
  {
    title: "24/7 Customer Support",
    description: "Whether you're in the planning phase or mid-trip, our support team is available round-the-clock to assist you with any travel queries.",
    image: "https://img.freepik.com/premium-vector/vector-flat-design-illustration-customer-support_727932-76.jpg"
  },
  {
    title: "Exclusive Travel Deals",
    description: "Gain access to exclusive deals and discounts on flights, hotels, and tour packages to help you save while exploring the world.",
    image: "https://dcassetcdn.com/design_img/299098/146489/146489_2663252_299098_image.jpg"
  }
];

const Slider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12">
        What We Can Do For You
      </h1>
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-wrap justify-center gap-5">
          {services.map((service, index) => (
            <li 
              key={index}
              className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/6 h-96 overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out"
                style={{ 
                  backgroundImage: `url(${service.image})`,
                  transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
                hoveredIndex === index ? 'bg-opacity-70' : 'bg-opacity-40'
              }`} />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                <p className={`text-sm transition-opacity duration-300 ease-in-out ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  {service.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slider;