const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    // Validation
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
      phone: phone ? phone.trim() : "",
      userType: userType.trim()
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
