const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Posts Model
const Post = require("../../models/Post");

// @route   GET api/movies/:movie_id
// @desc    Get posts on certain movie
// @access  Public
router.get("/:movie_id", (req, res) => {
  Post.find({ movieId: req.params.movie_id })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

module.exports = router;
