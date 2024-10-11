// routes/hotelRoutes.js
const express = require('express');
const  {fetchHotels}  = require('../controllers/hotelController.controller.js');

const router = express.Router();

// Define the route for fetching hotels
router.get('/', fetchHotels);

module.exports = router;
