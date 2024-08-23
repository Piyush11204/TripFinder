import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./LocationCards.css";

const LocationCards = () => {
  const [groupedLocations, setGroupedLocations] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/addlocation');
        const locations = response.data;

        // Group locations by type
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
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  return (
    <div className="location-carousels">
      {Object.keys(groupedLocations).map((type) => (
        <div key={type} className="location-carousel">
          <h2 className="carousel-title">🍂{type}'s</h2>
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            autoPlay={false}
          >
            {groupedLocations[type].map((location) => (
              <div key={location._id} className="location-item">
                <h2 className='LocationName'>{location.name}</h2>

                {/* Conditional image source handling */}
                {location.image.startsWith('http') ? (
                  <img src={location.image} alt={location.name} className="location-image" />
                ) : (
                  <img src={`http://localhost:8080/${location.image || location.image.url}`} alt={location.name} className="location-image" />
                )}

                <p><strong>Nearby Station:</strong> {location.station}</p>
                <p>
                  <strong>Rating:</strong>
                  {' '.repeat(location.rating).split('').map((_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </p>
                {location.additionalDetails && <p className='forReview'><strong>Review:</strong> {location.additionalDetails}</p>}
                <Link to={`/location/${location._id}`} state={{ location }} className='view-more-link'>
                  <button className='view-more'>View more</button>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default LocationCards;
