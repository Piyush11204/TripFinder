const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, validate } = require('../models/user');
const { handleAllUsers,handleUpdateProfile, handleCreatingUser } = require('../controllers/users');

// Middlewarer
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

// we use router.get to get the user 
router.get('/', handleAllUsers);
// the post is use to create the new user...
router.post('/',handleCreatingUser);

router.put("/me", auth, handleUpdateProfile);
// GET current user
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // Exclude password
        if (!user) return res.status(404).send({ message: 'User not found.' });
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
