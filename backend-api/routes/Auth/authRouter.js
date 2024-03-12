const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const upload = require("../../upload");

// Registration route
router.post("/register", async (req, res) => {
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
      password, // hashing is handled in the schema
    });

    // Save the user
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
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
});

router.put("/updateUser", upload.single("profilePicture"), async (req, res) => {
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
   
    const updatedInterests = newInterests.filter((interest) => !user.interests.includes(interest));
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
    res.json({ message: "User updated successfully.",user: updatedUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/checkPassword", async (req, res) => {
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
});


router.get("/skills", async (req, res) => {
  try {
    // Find users where primarySkill field exists and is not null
    const users = await User.find({ primarySkill: { $exists: true, $ne: null } });
    console.log({users})
    if (!users.length) {
      return res.status(404).json({ message: "No users found with a primary skill." });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Protected route
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "You have accessed a protected route!",
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  }
);

module.exports = router;
