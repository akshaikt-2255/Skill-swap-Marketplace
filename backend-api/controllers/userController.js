const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/Conversations");

// Controller functions
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
    });

    // Save the user
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for user by username
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare provided password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // User matched, create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Default to 1 hour
    );

    res.json({ token, username: user.username, user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateUser = async (req, res) => {
  const {
    username,
    name,
    email,
    primarySkill,
    bio,
    gender,
    interests,
    newPassword,
  } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newInterests = interests ? interests.split(",") : [];

    const updatedInterests = newInterests.filter(
      (interest) => !user.interests.includes(interest)
    );
    const combinedInterests = [...user.interests, ...updatedInterests];
    const update = {
      ...(name && { name }),
      ...(email && { email }),
      ...(primarySkill && { primarySkill }),
      ...(bio && { bio }),
      ...(gender && { gender }),
      ...(interests && { interests: combinedInterests }),
    };
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      update.password = hashedPassword;
    }

    if (req.file) {
      update.profilePicture = req.file.path;
    }
    await User.findOneAndUpdate({ username }, { $set: update }, { new: true });
    const updatedUser = await User.findOne({ username });
    res.json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

const checkPassword = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    return res.status(200).json({ isPasswordCorrect });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
};

const listUsersWithSkills = async (req, res) => {
  try {
    // Find users where primarySkill field exists and is not null
    const users = await User.find({
      primarySkill: { $exists: true, $ne: null },
    });
    console.log({ users });
    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No users found with a primary skill." });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const followUser = async (req, res) => {
  const { currentUserId, followId } = req.body;
  console.log(currentUserId, followId);
  try {
    if (req.user.id !== currentUserId) {
      return res.status(403).json({ message: "Unauthorized action." });
    }

    // Add followId to the current user's following array if not already following
    const currentUser = await User.findById(currentUserId);
    if (!currentUser.following.includes(followId)) {
      currentUser.following.push(followId);
      await currentUser.save();
    }
    console.log({ currentUser });
    // Optionally, add currentUserId to the followId user's followers array
    const userToFollow = await User.findById(followId);
    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      await userToFollow.save();
    }
    console.log({ userToFollow });
    res.json({ message: "User followed successfully.", followId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }
    return user._id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getConversations = async (req, res) => {
  const conversationId = req.params.conversationId;

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error while retrieving the conversation." });
  }
};

const getUsernameFromUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ username: user.username });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error while retrieving username." });
  }
};

const getUserIdFromUsername = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error while retrieving user ID." });
  }
};

const getUsernameFromEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ username: user.username });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error while retrieving username." });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res
      .status(500)
      .json({ error: "Server error while retrieving user." });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const userDtos = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }));
    return res.status(200).json(userDtos);
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ error: "Server error while retrieving users." });
  }
};

const removeFollower = async (req, res) => {
  const { userId, followerId } = req.body; 
  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { followers: followerId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      followerId,
      { $pull: { following: userId } },
      { new: true }
    );

    res.json({ message: "Follower removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

const unfollow = async (req, res) => {
  const { userId, unfollowId } = req.body; 

  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      unfollowId,
      { $pull: { followers: userId } },
      { new: true }
    );

    res.json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getConversations,
  getUserIdFromUsername,
  getUsernameFromEmail,
  getUsernameFromUserId,
  registerUser,
  loginUser,
  updateUser,
  checkPassword,
  listUsersWithSkills,
  getUserByUsername,
  getUserById,
  getUsers,
  followUser,
  removeFollower,
  unfollow
};
