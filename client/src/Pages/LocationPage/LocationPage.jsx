import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Star, MapPin } from 'lucide-react'; // Import Lucide icons

const LocationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationData = location.state?.location || {};
  const [sameTypeLocations, setSameTypeLocations] = useState([]);
  const [mapHeight, setMapHeight] = useState('450px');
  const [rating, setRating] = useState(0); // State for user rating
  const [review, setReview] = useState(''); // State for user review


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


  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const getImageSrc = (image) => {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `https://tripfinder.onrender.com/${image}`;
    }
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
    // Add your logic to handle the review submission here
    alert(`Review submitted: ${review} with rating ${rating} stars`);
    // Clear the review fields
    setReview('');
    setRating(0);
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  return (
    <div className="flex justify-center items-center p-3 lg:p-6 bg-purple-200 min-h-screen">
      <div className="bg-white w-full lg:max-w-8xl lg:w-[90%] rounded-xl shadow-lg p-3 lg:p-8 flex flex-col gap-8 mt-10 lg:mt-24">
        <header className="border-b-2 border-gray-300 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-center text-purple-700">{locationData.name}</h1>
        </header>
        <div className="flex flex-wrap gap-10">
          <figure className="flex-1 w-full sm:w-1/2">
            <img
              src={getImageSrc(locationData.image)}
              alt={locationData.name}
              className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-md"
            />
            <p className="mt-4 text-lg text-gray-700"><strong>Description:</strong> {locationData.description || 'No description available.'}</p>
          </figure>
          <section className="flex-1 w-full sm:w-1/2">
            <p className="text-lg"><strong>Type:</strong> {locationData.locationType || 'Not available'}</p>
            <p className="text-lg"><strong> Nearby Station:</strong> {locationData.station || 'Not available'}</p>
            <p className="text-lg">
              <strong>Rating:</strong>
              {' '.repeat(locationData.rating).split('').map((_, index) => (
                <span key={index}>⭐</span>
              ))}
            </p>
            {locationData.additionalDetails && (
              <p className="text-lg"><strong>Review:</strong> {locationData.additionalDetails}</p>
            )}
            <div className="mt-8 bg-gray-200 p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Find Us Here:</h2>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(locationData.name)}&key=${GOOGLE_MAPS_API_KEY}`}
                width="100%"
                height={mapHeight}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                className="rounded-md"
              ></iframe>
            </div>
          </section>
        </div>
        {/* <div className="flex justify-center gap-4 mt-8">
          <button className="bg-gray-800 text-white rounded-md px-6 py-2 hover:bg-gray-700" onClick={handleBackClick}>
            Back
          </button>
          <button className="bg-orange-500 text-white rounded-md px-6 py-2 hover:bg-orange-400" onClick={handleAddToWishList}>
            Add to Wish List
          </button>
        </div> */}
        <hr className='border-2' />

        {/* Recommendations Carousel */}
        {sameTypeLocations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl ml-11 font-bold mb-6 text-gray-800">Recommended {locationData.locationType}'s</h2>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={false}
              infinite={true}
              autoPlay={false}
            >
              {sameTypeLocations.map((location) => (
                <div
                  key={location._id}
                  className="p-4 mb-5 border-2 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={getImageSrc(location.image)}
                    alt={location.name}
                    className="w-full h-40 object-cover rounded-t-lg mb-2"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-purple-700 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{location.name}</h2>
                    <p className="text-sm mb-2"><strong><MapPin className="inline" /> Nearby Station:</strong> {location.station}</p>
                    <div className="flex items-center mb-4">
                      <strong className="mr-2">Rating:</strong>
                      {' '.repeat(location.rating).split('').map((_, index) => (
                        <span key={index} className="text-yellow-500">⭐</span>
                      ))}
                    </div>
                    <Link to={`/location/${location._id}`} state={{ location }} className="mt-4 block text-center">
                      <button className="bg-purple-700 text-white rounded-md px-4 py-2 hover:bg-purple-600 transition duration-200 ease-in-out">
                        View more
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Review Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Leave a Review</h2>
          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
            <div className="flex items-center">
              <span className="mr-4">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              rows="3"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="border border-gray-300 rounded-lg p-2"
            />
            <button type="submit" className="bg-purple-700 text-white rounded-md px-4 py-2 hover:bg-purple-600">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
