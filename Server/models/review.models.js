const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 0 } 
},{timestamps:true});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
