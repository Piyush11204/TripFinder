// controllers/locationController.js

const Location = require('../models/addLocation'); 

// Fetch location by ID
const getLocationById = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Location.findById(id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the controller functions
module.exports = {
    getLocationById,
};
