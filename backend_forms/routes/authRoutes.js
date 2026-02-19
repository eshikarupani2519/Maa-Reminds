const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

const jwtSecret = "ankaeshika";

//send otp
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail(
      email,
      "Your OTP for Registration",
      `Your OTP is ${otp}. It expires in 5 minutes.`
    );

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//verify otp

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      phone,
      fullName,
      password,
      confirmPassword,
      age,
      familyMemberName,
      familyMemberPhone,
      otp,
    } = req.body;

    if (!otp)
      return res.status(400).json({ message: "OTP required" });

    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord)
      return res.status(400).json({ message: "Invalid OTP" });

    if (otpRecord.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      fullName,
      password: hashedPassword,
      age,
      familyMemberName,
      familyMemberPhone,
    });

    await newUser.save();

    await Otp.deleteMany({ email });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//login user

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    const { password: pwd, ...userData } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//forgot password 

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `http://localhost:4200/forgotPW/${resetToken}`;

    await sendEmail(
      email,
      "Password Reset",
      `Click here to reset password: ${resetLink}`
    );

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  console.log("reset route hit with token:", req.params.token);
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log("Token from URL:", token);
    console.log("New Password:", newPassword);

    // 🔥 HASH TOKEN FROM URL
    const hashedToken = crypto.randomBytes(32).toString("hex");
      console.log("Hashed token:", hashedToken);

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });
    console.log("User found with hashed token:", user);
    // console.log(resetToken);
    // console.log(resetTokenExpiry);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
