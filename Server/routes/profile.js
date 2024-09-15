const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('./auth'); 

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Update user profile
router.put('/api/users/me', auth, upload.single('profileImage'), async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'email'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        updates.forEach((update) => user[update] = req.body[update]);

        if (req.file) {
            user.profileImage = `/uploads/${req.file.filename}`; 
        }

        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;