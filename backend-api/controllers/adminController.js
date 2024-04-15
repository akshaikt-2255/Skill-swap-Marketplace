const AdminUser = require('../models/Admin');
const bcrypt = require('bcryptjs');

const AdminController = {
    loginAdminUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            console.log(username + ' '+password);
            const adminUser = await AdminUser.findOne({ username });
            if (!adminUser) {
                return res.status(404).json({ message: 'Admin user not found' });
            }
            console.log({adminUser})
            const isMatch = await adminUser.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const adminUserData = {
                id: adminUser._id,
                username: adminUser.username
            };

            res.json({ message: 'Login successful', adminUser: adminUserData });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred during login', error: error.message });
        }
    }
};

module.exports = AdminController;
