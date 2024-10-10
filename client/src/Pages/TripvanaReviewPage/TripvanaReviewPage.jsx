import React, { useState } from 'react';
import { Star, Send, User } from 'lucide-react';

import "./TripBlog.css"
const dummyReviews = [
  { id: 1, name: 'Alice Johnson', profilePic: '/api/placeholder/50/50', review: 'Amazing experience with TRIPVANA! The destinations were breathtaking.', rating: 5, time: '2 hours ago' },
  { id: 2, name: 'Bob Smith', profilePic: '/api/placeholder/50/50', review: 'Great service, but could improve on communication.', rating: 4, time: '1 day ago' },
  { id: 3, name: 'Charlie Brown', profilePic: '/api/placeholder/50/50', review: 'TRIPVANA made our family vacation unforgettable!', rating: 5, time: '3 days ago' },
  { id: 4, name: 'Diana Prince', profilePic: '/api/placeholder/50/50', review: 'Good value for money. Will definitely use again.', rating: 4, time: '1 week ago' },
  { id: 5, name: 'Edward Norton', profilePic: '/api/placeholder/50/50', review: 'The itinerary was well-planned. Kudos to the team!', rating: 5, time: '2 weeks ago' },
  { id: 6, name: 'Fiona Gallagher', profilePic: '/api/placeholder/50/50', review: 'Had an incredible time! Highly recommend.', rating: 5, time: '1 day ago' },
  { id: 7, name: 'George Costanza', profilePic: '/api/placeholder/50/50', review: 'Some aspects could be better, but overall a good experience.', rating: 3, time: '2 days ago' },
  { id: 8, name: 'Helen Keller', profilePic: '/api/placeholder/50/50', review: 'A wonderful journey! Everything was perfect.', rating: 5, time: '3 days ago' },
  { id: 9, name: 'Isaac Newton', profilePic: '/api/placeholder/50/50', review: 'Enjoyed the trip but there were some hiccups.', rating: 4, time: '5 days ago' },
  { id: 10, name: 'Jack Sparrow', profilePic: '/api/placeholder/50/50', review: 'A fun and adventurous experience. Would go again!', rating: 4, time: '6 days ago' },
  { id: 11, name: 'Lara Croft', profilePic: '/api/placeholder/50/50', review: 'Fantastic trip! The guides were knowledgeable.', rating: 5, time: '1 week ago' },
  { id: 12, name: 'Mike Wazowski', profilePic: '/api/placeholder/50/50', review: 'Good, but I expected more from the accommodations.', rating: 3, time: '2 weeks ago' },
  { id: 13, name: 'Nina Simone', profilePic: '/api/placeholder/50/50', review: 'Absolutely stunning locations. I was blown away!', rating: 5, time: '3 weeks ago' },
  { id: 14, name: 'Oscar Wilde', profilePic: '/api/placeholder/50/50', review: 'An interesting journey with some memorable moments.', rating: 4, time: '1 month ago' },
  { id: 15, name: 'Peter Parker', profilePic: '/api/placeholder/50/50', review: 'The trip was amazing but felt a bit rushed.', rating: 4, time: '1 month ago' },
  { id: 16, name: 'Quentin Tarantino', profilePic: '/api/placeholder/50/50', review: 'Had a blast! Every moment was worth it.', rating: 5, time: '1 month ago' },
  { id: 17, name: 'Rachel Green', profilePic: '/api/placeholder/50/50', review: 'Everything was good except the food.', rating: 3, time: '1 month ago' },
  { id: 18, name: 'Sam Winchester', profilePic: '/api/placeholder/50/50', review: 'Thrilling adventure! I loved every part of it.', rating: 5, time: '2 months ago' },
  { id: 19, name: 'Tina Fey', profilePic: '/api/placeholder/50/50', review: 'Overall decent experience but room for improvement.', rating: 4, time: '2 months ago' },
  { id: 20, name: 'Uma Thurman', profilePic: '/api/placeholder/50/50', review: 'A magnificent trip! I would recommend to anyone.', rating: 5, time: '2 months ago' },
];


const ReviewCard = ({ review }) => (
  <div className="flex flex-col bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex items-center mb-4">
      {/* <img src={review.profilePic} alt={review.name} className="w-12 h-12 rounded-full mr-4" /> */}
      <div>
        <h3 className="font-semibold text-lg">{review.name}</h3>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < review.rating ? 'currentColor' : 'none'} />
          ))}
          <span className="text-xs text-gray-500 ml-2">{review.time}</span>
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
        className={`flex space-x-6 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{
          animationDuration: '10s', // Increase this for faster speed
          whiteSpace: 'nowrap',
        }}
      >
        {/* Duplicate reviews array to create infinite loop */}
        {[...reviews, ...reviews].map((review, index) => (
          <div key={`${review.id}-${index}`} className="flex-shrink-0 w-[300px]">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};


const TripvanaReviewPage = () => {
  const [newReview, setNewReview] = useState({ name: '', review: '', rating: 5 });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New review submitted:', newReview);
    setNewReview({ name: '', review: '', rating: 5 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-6xl font-bold text-center text-indigo-800 mb-12 mt-16">TRIPVANA Reviews</h1>
      
      <div className="mb-16">
        <MarqueeReviews reviews={dummyReviews} direction="left" />
        <MarqueeReviews reviews={dummyReviews} direction="right" />
        <MarqueeReviews reviews={dummyReviews} direction="left" />
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

      {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div> */}
    </div>
  );
};

export default TripvanaReviewPage;