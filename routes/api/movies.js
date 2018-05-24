const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");
const keys = require("../../config/keys");

// Load Posts Model
const Post = require("../../models/Post");

// @route   GET api/movies/:media/:movie_id
// @desc    Get the info regarding a movie
// @access  Public
router.get("/info/:media/:movie_id", (req, res) => {
  // Call to TMDB to get movie data by media type (TV or MOVIE), then ID
  rp
    .get(
      `https://api.themoviedb.org/3/${req.params.media}/${
        req.params.movie_id
      }?api_key=${keys.TMDBkey}&language=en-US`,
      {
        json: true
      }
    )
    .then(data => res.json(data));
});

// @route   GET api/movies/:movie_id
// @desc    Get posts on certain movie
// @access  Public
router.get("/posts/:movie_id", (req, res) => {
  Post.find({ movieId: req.params.movie_id })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

// @route   GET api/movies/featured
// @desc    Get movies in theatres
// @access  Public
router.get("/featured", (req, res) => {
  // Pull in 'Now Playing' movies
  rp
    .get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=9de0923a2225f7196ad07f894fe36ab8&language=en-US&page=1",
      {
        json: true
      }
    )
    .then(data => res.json(data.results))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

module.exports = router;
