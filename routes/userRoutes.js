// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User registration route
router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// routes/userRoutes.js
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select(
      "-password"
    );
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
