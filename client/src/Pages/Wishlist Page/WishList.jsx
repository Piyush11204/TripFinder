// WishList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WishList = () => {
    const [locations, setLocations] = useState([]);  // State to hold fetched locations
    const [error, setError] = useState('');          // State to handle error messages

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // List of location IDs to be fetched from the backend
                const locationIds = [
                    '66f6a153027c2896ea1b1503',
                    '66bb6137eb8658e2de3b80a6',
                    '66c4d3cd8587f0bfe3ea7a6'
                ];
                
                // Fetch locations for each ID
                const fetchedLocations = await Promise.all(
                    locationIds.map(id => axios.get(`http://localhost:8080/api/location/${id}`))
                );

                // Update the state with fetched location data
                setLocations(fetchedLocations.map(response => response.data));
            } catch (err) {
                // Handle error and log it
                setError('Failed to fetch locations. ' + err.message);
                console.error('Error details:', err);
            }
        };

        fetchLocations();  // Fetch data when the component mounts
    }, []);  // Empty dependency array to run once on mount

    return (
        <div className="wishlist-container">
            <h1>Wishlist</h1>
            <h1>Wishlist</h1>
            <h1>Wishlist</h1>
            <h1>Wishlist</h1>
            <h1>Wishlist</h1>
            {error && <p className="error-message">{error}</p>}  {/* Display error message if any */}

            <ul className="location-list">
                {/* Display fetched locations */}
                {locations.map(location => (
                    <li key={location._id} className="location-item">
                        <h2>{location.name}</h2>
                        <p>{location.description}</p>
                        <p>Type: {location.locationType}</p>
                        <p>Station: {location.station}</p>
                        <p>Rating: {location.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WishList;
