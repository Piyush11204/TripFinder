import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin, Calendar, Activity, Info } from 'lucide-react';
// import Carousel1 from '../../img/Carousel1.jpg';
// import Carousel2 from '../../img/Carousel2.jpg';
// import Carousel3 from '../../img/Carousel3.jpg';
// import Carousel4 from '../../img/Carousel4.jpg';
// import Carousel5 from '../../img/Carousel5.jpg';

const carouselData = [
  { 
    image: "https://res.cloudinary.com/dl16vvgyy/image/upload/v1729950974/cmztfluqq9brt3y48v8v.jpg", 
    text: "Explore breathtaking landscapes", 
    subheadline: "Majestic views", 
    description: "Discover breathtaking views that will leave you in awe. From towering mountains to serene beaches, our landscapes offer a perfect escape from the everyday hustle.",
    location: "Swiss Alps",
    activities: ["Hiking", "Skiing", "Photography"],
    bestTimeToVisit: "June to September",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.530430565568!2d8.232220075872092!3d46.56673397123631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478f9e1e69a8a55f%3A0x3b2c10d21fc9ae0!2sSwiss%20Alps!5e0!3m2!1sen!2sus!4v1633532611654!5m2!1sen!2sus"
  },
  { 
    image: "https://res.cloudinary.com/dl16vvgyy/image/upload/v1729950974/jnad6s7h1trkxjds47ji.jpg", 
    text: "Discover hidden gems", 
    subheadline: "Off the beaten path", 
    description: "Find places known only to the locals. Our curated selection of hidden gems will take you on a journey of discovery, revealing the true essence of each destination.",
    location: "Cinque Terre, Italy",
    activities: ["Coastal Walks", "Wine Tasting", "Beach Hopping"],
    bestTimeToVisit: "April to October",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.5453842266463!2d9.709973375820866!3d44.12677197910649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d4e4febc41ba67%3A0x4e3c1e077a09e15c!2sCinque%20Terre!5e0!3m2!1sen!2sus!4v1633532711654!5m2!1sen!2sus"
  },
  { 
    image: "https://res.cloudinary.com/dl16vvgyy/image/upload/v1729950974/kj97adrark0k4fnm8qhb.jpg", 
    text: "Experience local cultures", 
    subheadline: "Immersive experiences", 
    description: "Dive into the unique customs and traditions of diverse cultures. Our immersive experiences allow you to connect with locals and gain authentic insights into their way of life.",
    location: "Kyoto, Japan",
    activities: ["Tea Ceremony", "Temple Visits", "Geisha District Tour"],
    bestTimeToVisit: "March to May and October to November",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.2276723676017!2d135.76803987566228!3d35.01163897258347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6001061388bfef85%3A0x2af1b9e8f1a04c3!2sKyoto%2C%20Japan!5e0!3m2!1sen!2sus!4v1633532811654!5m2!1sen!2sus"
  },
  { 
    "image": "https://res.cloudinary.com/dl16vvgyy/image/upload/v1729950974/h5n51ri0139fm6ioq2dc.jpg", 
    "text": "Unwind in tropical paradise", 
    "subheadline": "Serene beaches", 
    "description": "Escape to the tranquil shores of pristine beaches, where the soft white sands meet crystal clear waters. Whether you're looking to relax or explore, these tropical havens offer the perfect getaway.",
    "location": "Maldives",
    "activities": ["Snorkeling", "Sunbathing", "Island Hopping"],
    "bestTimeToVisit": "November to April",
    "mapUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614335.951282085!2d72.38267073740865!3d3.202778012942881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x249fbaa33edbba05%3A0xf0f7b1fa9186018!2sMaldives!5e0!3m2!1sen!2sus!4v1633532811654!5m2!1sen!2sus"
},
{ 
    "image": "https://res.cloudinary.com/dl16vvgyy/image/upload/v1729950974/kgyfbn3f9cfpcnpopesp.jpg", 
    "text": "Journey through ancient history", 
    "subheadline": "Historic wonders", 
    "description": "Step back in time and explore the grandeur of ancient civilizations. From awe-inspiring monuments to fascinating ruins, embark on a journey to uncover the secrets of the past.",
    "location": "Petra, Jordan",
    "activities": ["Ruins Exploration", "Hiking", "Cultural Tours"],
    "bestTimeToVisit": "March to May and September to November",
    "mapUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30721.858576930564!2d35.44245309966531!3d30.328611134114682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15016f93ba3773e5%3A0x4f6378dc91767285!2sPetra%2C%20Jordan!5e0!3m2!1sen!2sus!4v1633532911654!5m2!1sen!2sus"
}

];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && !isPopupVisible) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, isPopupVisible]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[600px] overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {carouselData.map((item, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img src={item.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6">
              <p className="text-white text-lg sm:text-xl font-bold">{item.text}</p>
              <p className="text-white text-sm sm:text-lg">{item.subheadline}</p>

              <button className="text-white px-2 py-1 mt-2 bg-purple-500 flex rounded-full items-center" onClick={togglePopup}>
                <Info className='mr-1' />
                 View More
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200" onClick={prevSlide}>
        <ChevronLeft className="text-black" size={24} />
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200" onClick={nextSlide}>
        <ChevronRight className="text-black" size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button key={index} className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`} onClick={() => setCurrentIndex(index)} />
        ))}
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 transition-opacity duration-300">
          <div className="bg-white mt-20 p-6 rounded-lg relative max-w-2xl w-full max-h-[80vh] overflow-y-auto transform transition-transform duration-300 scale-100 opacity-100">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={togglePopup}>
              <X size={24} />
            </button>
            
            <img src={carouselData[currentIndex].image} alt={carouselData[currentIndex].text} className="w-full h-48 object-cover rounded-lg mb-4" />

            <h2 className="text-xl font-bold mb-2">{carouselData[currentIndex].text}</h2>
            <p className="text-lg mb-2">{carouselData[currentIndex].subheadline}</p>
            <p className="mb-4 text-sm">{carouselData[currentIndex].description}</p>

            <div className="flex items-center mb-2">
              <MapPin size={16} className="mr-2" /> 
              <span className="text-gray-700">{carouselData[currentIndex].location}</span>
            </div>
            <div className="flex items-center mb-2">
              <Calendar size={16} className="mr-2" />
              <span className="text-gray-700">Best time to visit: {carouselData[currentIndex].bestTimeToVisit}</span>
            </div>
            <div className="flex items-center mb-2">
              <Activity size={16} className="mr-2" />
              <span className="text-gray-700">Popular activities: {carouselData[currentIndex].activities.join(', ')}</span>
            </div>

            <iframe src={carouselData[currentIndex].mapUrl} width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
