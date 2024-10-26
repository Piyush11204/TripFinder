const Review = require("../models/review.models.js");

// Handle review form submission
async function handleReviewSubmission(req, res) {
    const { name, review, rating } = req.body;

    // Validate input fields
    if (!name || !review || !rating) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newReview = new Review({ name, review, rating });
        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Get all reviews
async function getAllReviews(req, res) {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleReviewSubmission,
    getAllReviews
};
