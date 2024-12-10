import React, { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';
import axios from 'axios'; 
import "./TripBlog.css";

const ReviewCard = ({ review }) => (
  <div className="flex flex-col bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex items-center mb-4">
      <div>
        <h3 className="font-semibold text-lg">{review.name}</h3>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < review.rating ? 'currentColor' : 'none'} />
          ))}
          {/* <span className="text-xs text-gray-500 ml-2">{new Date(review.createdAt).toLocaleDateString()}</span> */}
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-sm line-clamp-3">{review.review}</p>
  </div>
);

const MarqueeReviews = ({ reviews, direction }) => {
  return (
    <div className="overflow-hidden py-4 relative">
      <div
        className={`flex space-x-6 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{
          animationDuration: '10s', // Increase this for faster speed
          whiteSpace: 'nowrap',
        }}
      >
        {/* Duplicate reviews array to create infinite loop */}
        {[...reviews, ...reviews].map((review, index) => (
          <div key={`${review._id}-${index}`} className="flex-shrink-0 w-[300px]">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TripvanaReviewPage = () => {
  const [newReview, setNewReview] = useState({ name: '', review: '', rating: 5 });
  const [reviews, setReviews] = useState([]); // State for fetched reviews

  // Fetch reviews from the server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://tripfinder.onrender.com/api/allreview'); // Adjust the URL according to your API
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []); // Run once on component mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tripfinder.onrender.com/api/review', newReview); // Adjust the URL according to your API
      setReviews([...reviews, response.data]); // Update state with new review
      console.log("review Submited" ,response)
      setNewReview({ name: '', review: '', rating: 5 }); // Reset form
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-6xl font-bold text-center text-indigo-800 mb-12 mt-16">TRIPVANA Reviews</h1>

      <div className="mb-16">
        <MarqueeReviews reviews={reviews} direction="left" />
        <MarqueeReviews reviews={reviews} direction="right" />
        <MarqueeReviews reviews={reviews} direction="left" />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-indigo-800">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
            <textarea
              id="review"
              rows="4"
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill={star <= newReview.rating ? 'currentColor' : 'none'}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripvanaReviewPage;
