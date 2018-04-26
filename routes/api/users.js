const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");

// Input Validation
const validateRegisterInput = require("../../validation/registerValidation");
const validateLoginInput = require("../../validation/loginValidation");

// Load User Model
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check the validation for errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if there is already a user with the same username
  User.findOne({ username: { $regex: req.body.username, $options: "i" } }).then(
    user => {
      if (user) {
        errors.username = "Username already exists.";
        return res.status(400).json(errors);
      } else {
        // If not, check to see if there is a user with the same email
        User.findOne({ email: req.body.email }).then(user => {
          if (user) {
            errors.email = "Email is already registered with another account.";
            return res.status(400).json(errors);
          } else {
            // Bring in gravatar
            const avatar = gravatar.url(req.body.email, {
              s: "200", // Size
              r: "pg", // Rating
              d: "mm" // Default
            });

            // If username and email not in use, create user
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              avatar,
              password: req.body.password
            });

            // Encrypt the password using bcrypt
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                // Turn the user password into hash
                newUser.password = hash;

                // Send new user to database through mongoose
                newUser
                  .save()
                  .then(user => {
                    // Create a profile for this user
                    const newProfile = new Profile({
                      displayname: req.body.username,
                      user: user._id
                    }).save();

                    res.json(user);
                  })
                  .catch(err => console.log(err));
              });
            });
          }
        });
      }
    }
  );
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = { $regex: req.body.username, $options: "i" };
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then(user => {
    // Check if username exists
    if (!user) {
      return res.status(404).json({ username: "Username not found" });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Passwords Matched and are correct

        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
          avatar: user.avatar
        };

        // Sign JsonWebToken
        jwt.sign(payload, keys.key, { expiresIn: "7d" }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Returns current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      // Could just send 'user' but this includes the hashed password, so only send back id, username and email
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

// Export router so server.js can pick it up
module.exports = router;
