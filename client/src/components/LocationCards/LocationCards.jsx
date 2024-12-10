import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Star, MapPin, ChevronRight } from 'lucide-react';


const LocationCard = ({ location }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-slate-100 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={location.image.startsWith('http') ? location.image : `https://tripfinder.onrender.com/${location.image || location.image.url}`}
          alt={location.name} 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-purple-600 text-white px-2 py-1 m-2 rounded-full text-xs font-semibold">
          {location.locationType}
        </div>
      </div>
      <div className="p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">{location.name}</h2>
        <div className="flex items-center mb-2">
          <MapPin size={16} className="text-gray-500 mr-1" />
          <p className="text-sm text-gray-600">{location.station}</p>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={index < location.rating ? "text-yellow-400" : "text-gray-300"}
              fill={index < location.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        {location.additionalDetails && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 truncate">{location.additionalDetails}</p>
        )}
        <Link 
          to={`/location/${location._id}`} 
          state={{ location }} 
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
        >
          View more
          <ChevronRight size={16} className={`ml-1 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
        </Link>
      </div>
    </div>
  );
};

const LocationCards = () => {
  const [groupedLocations, setGroupedLocations] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://tripfinder.onrender.com/api/addlocation');
        const locations = response.data;

        const grouped = locations.reduce((acc, location) => {
          const { locationType } = location;
          if (!acc[locationType]) {
            acc[locationType] = [];
          }
          acc[locationType].push(location);
          return acc;
        }, {});

        setGroupedLocations(grouped);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  return (
    <div className="py-8 bg-gray-100">
      {Object.entries(groupedLocations).map(([type, locations]) => (
        <div key={type} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            <span className="mr-2" role="img" aria-label={type}>
              {type === 'Beach' ? '🏖️' :type === 'Temple' ? '🛕':type === 'Park' ? '⛲':type === 'Water park' ? '🎢': type === 'Mountain' ? '⛰️' : type === 'City' ? '🏙️' : '🍂'}
            </span>
            {type} Destinations
          </h2>
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {locations.map((location) => (
              <div key={location._id} className="px-2">
                <LocationCard location={location} />
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default LocationCards;