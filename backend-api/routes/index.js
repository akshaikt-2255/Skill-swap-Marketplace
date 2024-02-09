const express = require('express');
const router = express.Router();

// Import routes
const authRouter = require('./Auth/authRouter');

// Register the routes
router.use('/auth', authRouter);

// Export the configured router
module.exports = router;
