import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./LocationCards.css";

const LocationCards = () => {
  const [locations, setLocations] = useState([]);




  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/addlocation');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (

    <div className="location-list">
      {locations.map((location) => (
        <div key={location._id} className="location-item">
          <h2 className='LocationName'>{location.name}</h2>
          <img src={`http://localhost:8080/${location.image}`} alt={location.name} className="location-image" />
          <p><strong>Type:</strong> {location.locationType}</p>
          <p><strong>Nearby Station:</strong> {location.station}</p>
          <p><strong>Rating:</strong> {location.rating} ⭐</p>
          {location.additionalDetails && <p className='forReview'><strong>Review:</strong> {location.additionalDetails}</p>}
          <Link to={`/location/${location._id}`} state={{ location }} className='view-more-link'>
            <button className='view-more'>View more</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LocationCards