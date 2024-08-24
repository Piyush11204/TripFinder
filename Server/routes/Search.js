const express = require('express');
const Location = require('../models/addLocation');
const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).send({ message: 'Query parameter is required' });
        }

        // Search by name, type, or station
        const searchRegex = new RegExp(query, 'i');
        const results = await Location.find({
            $or: [
                { name: searchRegex },
                { type: searchRegex },
                { station: searchRegex }
            ]
        });

        // Ensure image field has correct structure (URL or path)
        const formattedResults = results.map(result => {
            if (result.image && !result.image.startsWith('http')) {
                // Assuming local images are served from a static folder, prepend the base URL
                result.image = `http://localhost:8080/${result.image}`;
            }
            return result;
        });

        res.status(200).json(formattedResults);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).send({ message: 'Internal Server Error', error });
    }
});

module.exports = router;
