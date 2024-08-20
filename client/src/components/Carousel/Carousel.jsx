import React, { useState, useEffect } from 'react';
import "./Carousel.css";
import Carousel1 from '../../img/Carousel1.jpg'; 
import Carousel2 from '../../img/Carousel2.jpg'; 
import Carousel3 from '../../img/Carousel3.jpg'; 
import Carousel4 from '../../img/Carousel4.jpg'; 
import Carousel5 from '../../img/Carousel5.jpg'; 

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [Carousel1, Carousel2, Carousel3 ,Carousel4,Carousel5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3200); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img className="CarouselImages" src={image} alt={`Slide ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" onClick={prevSlide}>❮</button>
      <button className="carousel-control-next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Carousel;
