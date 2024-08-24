const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL, { })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

module.exports = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        // console.log('Connected to database successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};