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
        <div className="wishlist-container max-w-3xl my-24 mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">My Wishlist</h1>

            {/* Display error message if any */}
            {error && <p className="error-message text-red-500 mb-4">{error}</p>}

            {/* Display fetched locations in a list */}
            <ul className="location-list space-y-4">
                {locations.length > 0 ? (
                    locations.map(location => (
                        <li key={location._id} className="location-item p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-semibold">{location.name}</h2>
                            <p className="text-gray-600">{location.description}</p>
                            <p><strong>Type:</strong> {location.locationType}</p>
                            <p><strong>Station:</strong> {location.station}</p>
                            <p><strong>Rating:</strong> {location.rating}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 ">No locations added to the wishlist yet.</p>
                )}
            </ul>
        </div>
    );
};

export default WishList;
