// adminRoutes.js
const express = require('express');
const AdminController = require('../controllers/adminController');
const UserController = require('../controllers/userController');
const adminRouter = express.Router();

// Admin login route
adminRouter.post('/login', AdminController.loginAdminUser);
adminRouter.delete('/users/:userId', UserController.deleteUser);

module.exports = adminRouter;
