// routes/locationRoutes.js

const express = require('express');
const { getLocationById } = require('../controllers/locationController'); // Adjust path based on your structure

const router = express.Router();

// Route to get location by ID
router.get('/location/:id', getLocationById);

module.exports = router;
