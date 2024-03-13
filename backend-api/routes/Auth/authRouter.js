const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const upload = require("../../upload");

const UserController = require('../../controllers/userController');

authRouter.post('/register', UserController.registerUser);
authRouter.post('/login', UserController.loginUser);
authRouter.put('/updateUser', upload.single('profilePicture'), UserController.updateUser);
authRouter.post('/checkPassword', UserController.checkPassword);
authRouter.get('/skills', UserController.listUsersWithSkills);
authRouter.put('/follow', passport.authenticate('jwt', { session: false }), UserController.followUser);
authRouter.get('/conversations/:conversationId', UserController.getConversations);
authRouter.get('/username/:userId', UserController.getUsernameFromUserId);
authRouter.get('/user/:username', UserController.getUserIdFromUsername);
authRouter.post('/username', UserController.getUsernameFromEmail);
authRouter.get('/user/id/:userId', UserController.getUserById);
authRouter.get('/users', UserController.getUsers);

// Protected route example
authRouter.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});

module.exports = authRouter;
