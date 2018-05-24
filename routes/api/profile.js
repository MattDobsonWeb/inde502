const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");

// Load Validation
const validateProfileInput = require("../../validation/profileValidation");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get the current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // Find the user in profile collection
    Profile.findOne({ user: req.user.id })
      .populate("user", ["username", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  // Find all users in profile collection
  Profile.find()
    .populate("user", ["username", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get profile fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.displayname) profileFields.displayname = req.body.displayname;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.birthday) profileFields.birthday = req.body.birthday;

    Profile.findOne({ username: req.user.username }).then(profile => {
      if (profile) {
        // Update user profile
        Profile.findOneAndUpdate(
          { username: req.user.username },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route   GET api/profile/handle/:username
// @desc    Get profile by username
// @access  Public
router.get("/handle/:username", (req, res) => {
  const errors = {};

  // Search for the user by username
  Profile.findOne({
    username: new RegExp("^" + req.params.username + "$", "i")
  })
    // Populate user array with ID, username and avatar
    .populate("user", ["username", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    });
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  // Find the profile by ID
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["username", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find the profile and then remove it
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// Export router so server.js can pick it up
module.exports = router;
