// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const logger = require("../logger");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, ...otherDetails } =
    req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
    logger.info(
      "Hashed password during registration:",
      hashedPassword
    );

    // Create a new user with the hashed password
    const user = new User({
      email,
      password: hashedPassword,
      ...otherDetails,
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    logger.error("Error registering user", {
      error,
    });
    res
      .status(500)
      .json({ error: "Error registering user" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select(
      "-password"
    );
    res.json(users);
  } catch (err) {
    logger.error("Server Error", {
      error: err.message,
    });
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    logger.info(
      `Login attempt for email: ${email}`
    );

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(
        `User not found for email: ${email}`
      );

      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    logger.info(
      `User found: ${user.firstName} (${email})`
    );

    logger.debug("Stored hashed password:", {
      hashedPassword: user.password,
    });

    logger.debug("Entered password:", {
      password,
    });

    // Check if both values are strings
    logger.debug("Type of entered password:", {
      type: typeof password,
    });
    logger.debug(
      "Type of stored hashed password:",
      { type: typeof user.password }
    );

    // Check if there are unexpected characters in the input
    logger.debug("Entered password length:", {
      length: password.length,
    });
    logger.debug(
      "Stored hashed password length:",
      { length: user.password.length }
    );

    // Check for spaces or invisible characters in the entered password
    logger.debug(
      "Entered password character codes:",
      {
        codes: password
          .split("")
          .map((char) => char.charCodeAt(0)),
      }
    );

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    logger.info("Password comparison result:", {
      isMatch,
    });

    if (!isMatch) {
      logger.warn(
        `Password does not match for user: ${email}`
      );

      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // Return the token and the firstName
    res.json({
      token,
      firstName: user.firstName,
    });
    logger.info(
      `Login successful for email: ${email}`
    );
  } catch (error) {
    logger.error(
      `Error during login for email: ${email}`,
      { error }
    );

    res.status(500).json({
      error: "Server error during login",
    });
  }
});

module.exports = router;
