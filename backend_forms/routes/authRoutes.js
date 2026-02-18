const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

const jwtSecret = 'ankaeshika';

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { email, phone, fullName, password, confirmPassword, age, familyMemberName, familyMemberPhone } = req.body;

    // Validation
    if (!email || !phone || !fullName || !password || !confirmPassword || !age) {
      return res.status(400).json({ message: "All required fields are needed" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      fullName,
      password: hashedPassword,
      age,
      familyMemberName,
      familyMemberPhone
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in register route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const payload = {
      id: user._id,
    };
    
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); 
    
    res.status(200).json({ message: "login successful", token: token, user: user });

  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// FORGOT PASSWORD ROUTE
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in forgot password:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET user by ID
router.get("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
       if (typeof id !== "string") id = String(id);

    // Remove extra quotes, spaces
    id = id.replace(/["']/g, '').trim();
    console.log(id);
   

    // Find user by _id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data (you can omit sensitive fields like password)
    const { password, ...userData } = user.toObject();
    // console.log(userData);
    res.status(200).json({ user: userData });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;