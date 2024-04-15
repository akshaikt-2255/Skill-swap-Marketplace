const express = require('express');
const router = express.Router();

// Import routes
const authRouter = require('./Auth/authRouter');
const chatRouter = require('./chatRoutes');
const eventRouter = require('./eventRoutes');
const adminRouter = require('./adminRoutes');


// Register the routes
router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/events',eventRouter);
router.use('/admin', adminRouter);

// Export the configured router
module.exports = router;
