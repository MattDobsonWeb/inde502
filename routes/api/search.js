const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");
const keys = require("../../config/keys");
const isEmpty = require("../../validation/is-empty");
const RateLimit = require("express-rate-limit");

// @route   GET api/search/test
// @desc    Tests search route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Search Works" }));

// @route   GET api/search/media/:query
// @desc    Get movie/tv info
// @access  Public
router.get("/media/:query", (req, res) => {
  rp
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        keys.TMDBkey
      }&language=en-US&query=${req.params.query}&page=1
            }`,
      {
        json: true
      }
    )
    .then(results => res.json(results.results));
});

// @route   GET api/search/user/:username
// @desc    Get movie/tv info
// @access  Public
router.get("/user/:username", (req, res) => {
  User.find({ username: new RegExp("^" + req.params.username, "i") }).then(
    user => res.json(user)
  );
});

module.exports = router;
