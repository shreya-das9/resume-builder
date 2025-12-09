const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// In-memory storage for testing (fallback when MongoDB is unavailable)
const mockUsers = {};

let User;
try {
  User = require("../models/User");
} catch (err) {
  User = null;
  console.warn("User model unavailable, using mock storage");
}

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
      // Try to use MongoDB
      if (User) {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          profileImageUrl,
        });

        return res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
          token: generateToken(user._id),
        });
      }
    } catch (dbError) {
      console.log("Database error, using mock storage:", dbError.message);
    }

    // Fallback: Use mock storage
    if (mockUsers[email]) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = Date.now().toString();

    mockUsers[email] = {
      _id: userId,
      name,
      email,
      password: hashedPassword,
      profileImageUrl: profileImageUrl || "",
    };

    res.status(201).json({
      _id: userId,
      name,
      email,
      profileImageUrl: profileImageUrl || "",
      token: generateToken(userId),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    // Return user data with JWT
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
