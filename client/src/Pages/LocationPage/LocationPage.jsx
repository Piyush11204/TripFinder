import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LocationPage.css';

const LocationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationData = location.state?.location || {};

  const [mapHeight, setMapHeight] = useState('450px');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddToWishList = () => {
    const locationId = locationData._id;
    if (!locationId) {
      alert('Location ID is missing.');
      return;
    }

    let wishList = JSON.parse(localStorage.getItem('wishList')) || [];

    if (wishList.includes(locationId)) {
      alert('This item is already in your Wish List!');
    } else {
      wishList.push(locationId);
      localStorage.setItem('wishList', JSON.stringify(wishList));
      alert('Added to Wish List!');
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setMapHeight('300px');
    } else {
      setMapHeight('450px');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const getImageSrc = (image) => {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `http://localhost:8080/${image}`;
    }
  };

  return (
    <div className="location-page-container">
      <div className="location-page-content">
        <header className="location-page-header">
          <h1 className="location-page-title">{locationData.name}</h1>
        </header>
        <div className="location-page-main">
          <figure className="location-page-figure">
            <img 
              src={getImageSrc(locationData.image)} 
              alt={locationData.name} 
              className="location-page-image" 
            />
            <p className='location-discption'><strong>Description:</strong> {locationData.description || 'No description available.'}</p>
          </figure>
          <section className="location-page-details">
            <p><strong>Type:</strong> {locationData.locationType || 'Not available'}</p>
            <p><strong>Nearby Station:</strong> {locationData.station || 'Not available'}</p>
            <p>
                  <strong>Rating:</strong>
                  {' '.repeat(locationData.rating).split('').map((_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </p>
            {locationData.additionalDetails && (
              <p><strong>Review:</strong> {locationData.additionalDetails}</p>
            )}
            <div className="map-container">
              <h2>Find Us Here:</h2>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(locationData.name)}&key=${GOOGLE_MAPS_API_KEY}`}
                width="100%"
                height={mapHeight}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </section>
        </div>
        <div className="location-page-footer">
          <button className="back-button" onClick={handleBackClick}>Back</button>
          <button className="wishlist-button" onClick={handleAddToWishList}>Add to Wish List</button>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
