const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({
            username,
            email,
            password // hashing is handled in the schema
        });

        // Save the user
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check for user by username
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Compare provided password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // User matched, create JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // Sign token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Default to 1 hour
        );

        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Protected route
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        message: 'You have accessed a protected route!',
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
        },
    });
});

module.exports = router;
