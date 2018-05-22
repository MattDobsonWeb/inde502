const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");
const keys = require("../../config/keys");

// Load Posts Model
const Post = require("../../models/Post");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load Notification Model
const Notification = require("../../models/Notification");

// Load Posts Valdiation
const validatePostInput = require("../../validation/postValidation");

// @route   GET api/admin/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Admin Works" }));

// @route   GET api/admin/posts/days/:days
// @desc    Get posts x number of days
// @access  Public
router.get(
  "/posts/hours/:hours",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // If user is not admin, return unauthroized
    if (!req.user.admin) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }

    Post.find({
      date: {
        $gte: new Date(new Date() - req.params.hours * 60 * 60 * 1000)
      }
    })
      .sort({ date: -1 })
      .then(posts => res.json({ timeframe: req.params.hours, posts: posts }))
      .catch(err => res.status(404).json({ nouserfound: "No posts found" }));
  }
);

module.exports = router;
