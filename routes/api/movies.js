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
router.get("/:media/:movie_id", (req, res) => {
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

router.get("/search/:movie_search", (req, res) => {
  rp
    .get(
      `https://api.themoviedb.org/3/find/${req.params.movie_search}?api_key=${
        keys.TMDBkey
      }&external_source=imdb_id`,
      {
        json: true
      }
    )
    .then(data => res.json(data));
});

// @route   GET api/movies/images/:movie_id
// @desc    Get the images regarding a movie
// @access  Public
router.get("/images/:movie_id", (req, res) => {
  rp
    .get(
      `https://api.themoviedb.org/3/find/${req.params.movie_id}?api_key=${
        keys.TMDBkey
      }&language=en-US&external_source=imdb_id`,
      { json: true }
    )
    .then(data => {
      if (data.movie_results.length > 0) {
        res.json({
          backdrop:
            keys.backdropImagePath + data.movie_results[0]["backdrop_path"],
          poster: keys.posterImagePath + data.movie_results[0]["poster_path"]
        });
      } else {
        res.json({
          backdrop:
            keys.backdropImagePath + data.tv_results[0]["backdrop_path"],
          poster: keys.posterImagePath + data.tv_results[0]["poster_path"]
        });
      }
    });
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
