const review = require("../models/review.models.js");
const { getAllReviews,handleReviewSubmission} = require("../controllers/review.controller.js")

const ReviewRouter = require("express").Router();

ReviewRouter.post("/review", handleReviewSubmission);
ReviewRouter.get("/allreview", getAllReviews);
module.exports = ReviewRouter;