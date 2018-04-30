const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");
const keys = require("../../config/keys");

// Load Posts Model
const Post = require("../../models/Post");

// @route   GET api/movies/info/:movie_id
// @desc    Get the info regarding a movie
// @access  Public
router.get("/info/:movie_id", (req, res) => {
  rp
    .get(
      `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${keys.OMDBkey}`,
      {
        json: true
      }
    )
    .then(data => res.json(data));
});

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
