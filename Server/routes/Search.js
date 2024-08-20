const express = require('express');
const Location = require('../models/addLocation');
const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).send({ message: 'Query parameter is required' });
        }

        // Search by name or description
        const searchRegex = new RegExp(query, 'i'); 
        const results = await Location.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex }
            ]
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).send({ message: 'Internal Server Error', error });
    }
});

module.exports = router;
