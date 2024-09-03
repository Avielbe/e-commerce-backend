// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User registration route
// router.post("/register", async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     password,
//   } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res
//         .status(400)
//         .json({ message: "User already exists" });
//     }

//     user = new User({
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       password,
//     });

//     await user.save();

//     const token = jwt.sign(
//       { id: user._id },
//       "your_jwt_secret",
//       { expiresIn: "1h" }
//     );

//     res.status(201).json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });
router.post("/register", async (req, res) => {
  const { email, password, ...otherDetails } =
    req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
    console.log(
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
    res
      .status(500)
      .json({ error: "Error registering user" });
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

//login v3:
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log(
//       `Login attempt for email: ${email}`
//     );
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log(
//         "User not found for email:",
//         email
//       );
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }
//     console.log(
//       `User found: ${user.firstName} (${email})`
//     );

//     // Compare the entered password with the hashed password
//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     );
//     if (!isMatch) {
//       console.log(
//         "Password does not match for user:",
//         email
//       );
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || "your_jwt_secret",
//       { expiresIn: "1h" }
//     );

//     // Return the token and the firstName
//     res.json({
//       token,
//       firstName: user.firstName,
//     });
//     console.log(
//       `Login successful for email: ${email}`
//     );
//   } catch (error) {
//     console.error(
//       `Error during login for email: ${email}`,
//       error
//     );
//     res.status(500).json({
//       error: "Server error during login",
//     });
//   }
// });

// login ver 4:
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log(
//       `Login attempt for email: ${email}`
//     );
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log(
//         "User not found for email:",
//         email
//       );
//       return res
//         .status(400)
//         .json({
//           message: "Invalid email or password",
//         });
//     }
//     console.log(
//       `User found: ${user.firstName} (${email})`
//     );

//     // Log the actual stored hashed password
//     console.log(
//       "Stored hashed password:",
//       user.password
//     );
//     // Log the entered password
//     console.log("Entered password:", password);

//     // Compare the entered password with the hashed password
//     const isMatch = await bcrypt.compare( password, user.password );
//     console.log(
//       "Password comparison result:",
//       isMatch
//     ); // Log comparison result

//     if (!isMatch) {
//       console.log(
//         "Password does not match for user:",
//         email
//       );
//       return res
//         .status(400)
//         .json({
//           message: "Invalid email or password",
//         });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || "your_jwt_secret",
//       { expiresIn: "1h" }
//     );

//     // Return the token and the firstName
//     res.json({
//       token,
//       firstName: user.firstName,
//     });
//     console.log(
//       `Login successful for email: ${email}`
//     );
//   } catch (error) {
//     console.error(
//       `Error during login for email: ${email}`,
//       error
//     );
//     res
//       .status(500)
//       .json({
//         error: "Server error during login",
//       });
//   }
// });
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(
      `Login attempt for email: ${email}`
    );

    const user = await User.findOne({ email });
    if (!user) {
      console.log(
        "User not found for email:",
        email
      );
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    console.log(
      `User found: ${user.firstName} (${email})`
    );
    console.log(
      "Stored hashed password:",
      user.password
    );
    console.log("Entered password:", password);

    // New: Check if both values are strings
    console.log(
      "Type of entered password:",
      typeof password
    );
    console.log(
      "Type of stored hashed password:",
      typeof user.password
    );

    // New: Check if there are unexpected characters in the input
    console.log(
      "Entered password length:",
      password.length
    );
    console.log(
      "Stored hashed password length:",
      user.password.length
    );

    // New: Check for spaces or invisible characters in the entered password
    console.log(
      "Entered password character codes:",
      password
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    console.log(
      "Password comparison result:",
      isMatch
    );

    if (!isMatch) {
      console.log(
        "Password does not match for user:",
        email
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
    console.log(
      `Login successful for email: ${email}`
    );
  } catch (error) {
    console.error(
      `Error during login for email: ${email}`,
      error
    );
    res.status(500).json({
      error: "Server error during login",
    });
  }
});

router.post(
  "/reset-password",
  async (req, res) => {
    const { email, newPassword } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(
        newPassword,
        10
      );

      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();

      res.json({
        message: "Password reset successful",
      });
    } catch (error) {
      console.error(
        "Error resetting password:",
        error
      );
      res.status(500).json({
        error:
          "Server error during password reset",
      });
    }
  }
);

module.exports = router;
