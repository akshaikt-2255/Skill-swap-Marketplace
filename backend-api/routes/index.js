const express = require('express');
const router = express.Router();

// Import routes
const authRouter = require('./Auth/authRouter');
const chatRouter = require('./chatRoutes');

// Register the routes
router.use('/auth', authRouter);
router.use('/chat', chatRouter);

// Export the configured router
module.exports = router;
