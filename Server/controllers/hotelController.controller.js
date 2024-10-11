// controllers/hotelController.js
const https = require('https');

// Function to fetch hotel data
const fetchHotels = (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'tripadvisor16.p.rapidapi.com',
    port: null,
    path: '/api/v1/hotels',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
    }
  };

  const reqApi = https.request(options, function (apiRes) {
    const chunks = [];

    apiRes.on('data', function (chunk) {
      chunks.push(chunk);
    });

    apiRes.on('end', function () {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString())); 
    });
  });

  reqApi.on('error', (error) => {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Failed to fetch hotel data' });
  });

  reqApi.end();
};

module.exports = {
  fetchHotels
};
