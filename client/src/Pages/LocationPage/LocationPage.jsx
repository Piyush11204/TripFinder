import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Star, MapPin } from 'lucide-react';

const LocationPage = () => {
  const location = useLocation();
  const locationData = location.state?.location || {};
  const [sameTypeLocations, setSameTypeLocations] = useState([]);
  const [mapHeight] = useState('400px');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const getImageSrc = (image) => {
    return image.startsWith('http') ? image : `https://tripfinder.onrender.com/${image}`;
  };

  useEffect(() => {
    const fetchSameTypeLocations = async () => {
      try {
        const response = await axios.get('https://tripfinder.onrender.com/api/addlocation');
        const locations = response.data;
        const filteredLocations = locations.filter(
          (loc) => loc.locationType === locationData.locationType && loc._id !== locationData._id
        );
        setSameTypeLocations(filteredLocations);
      } catch (error) {
        console.error('Error fetching same type locations:', error);
      }
    };

    if (locationData.locationType) {
      fetchSameTypeLocations();
    }
  }, [locationData.locationType, locationData._id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    alert(`Review submitted: ${review} with rating ${rating} stars`);
    setReview('');
    setRating(0);
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  return (
    <div className="bg-purple-100 min-h-screen py-4">
      <div className="bg-white max-w-7xl mx-auto rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold text-purple-700 border-b border-gray-200 pb-2 mb-4">
          {locationData.name}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <img
              src={getImageSrc(locationData.image)}
              alt={locationData.name}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
            <p className="text-gray-700"><span className="font-semibold">Description:</span> {locationData.description || 'No description available.'}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p><span className="font-semibold">Type:</span> {locationData.locationType || 'Not available'}</p>
              <p><span className="font-semibold">Nearby Station:</span> {locationData.station || 'Not available'}</p>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Rating:</span>
                {Array(locationData.rating).fill('⭐').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              {locationData.additionalDetails && (
                <p><span className="font-semibold">Review:</span> {locationData.additionalDetails}</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Location Map</h2>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(locationData.name)}&key=${GOOGLE_MAPS_API_KEY}`}
                width="100%"
                height={mapHeight}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                className="rounded"
              />
            </div>
          </div>
        </div>

        {sameTypeLocations.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Similar {locationData.locationType}s</h2>
            <Carousel responsive={responsive} swipeable draggable infinite className="py-2">
              {sameTypeLocations.map((location) => (
                <div key={location._id} className="mx-2">
                  <div className="bg-white rounded shadow-md hover:shadow-lg transition-shadow">
                    <img
                      src={getImageSrc(location.image)}
                      alt={location.name}
                      className="w-full h-36 object-cover rounded-t"
                    />
                    <div className="p-3">
                      <h3 className="font-bold text-purple-700 truncate">{location.name}</h3>
                      <p className="text-sm flex items-center gap-1 my-1">
                        <MapPin size={14} />
                        {location.station}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        {Array(location.rating).fill('⭐').map((star, i) => (
                          <span key={i} className="text-xs">{star}</span>
                        ))}
                      </div>
                      <Link to={`/location/${location._id}`} state={{ location }}>
                        <button className="w-full bg-purple-600 text-white text-sm py-1 rounded hover:bg-purple-700 transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )}

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h2 className="text-xl font-bold text-purple-700 mb-3">Write a Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              <span>Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
              className="w-full border rounded p-2 h-24 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;