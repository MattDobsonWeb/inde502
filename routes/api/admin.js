const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");
const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");
const NaturalLanguageUnderstandingV1 = require("watson-developer-cloud/natural-language-understanding/v1.js");
const keys = require("../../config/keys");
const isEmpty = require("../../validation/is-empty");

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
// @desc    Get posts within x number of hourse
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

    // Search for posts within the hours parameter and return them
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

// @route   GET api/admin/analyze/media/:id
// @desc    Analyze the sentiment of posts on media
// @access  Public
router.get("/analyze/media/:id", (req, res) => {
  Post.find({ movieId: req.params.id })
    .sort({ date: -1 })
    .then(posts => {
      // Initiate string of the posts for the Sentiment Analyzer to use
      let textInput = [];

      // Push each post to the string
      posts.map(post => {
        textInput += " " + post.text + ".";
      });

      // Initiate Sentiment Analyzer
      let natural_language_understanding = new NaturalLanguageUnderstandingV1({
        version: "2018-03-16",
        username: "3888a591-7e0b-4767-a058-66c54ecd369b",
        password: "4sItmserNtkp"
      });

      // Parameter for sentiment anlayzer
      // Returns only the sentiment of the whole document
      const parameters = {
        text: textInput,
        features: {
          sentiment: {}
        }
      };

      // Results array to res.json
      let results = {
        title: posts[0].movieTitle,
        media: posts[0].movieMedia,
        posts: posts.length,
        sentiment: "",
        score: ""
      };

      // Analyze the posts and get a response
      natural_language_understanding.analyze(parameters, function(
        err,
        response
      ) {
        if (err) console.log("error:", err);
        else {
          // If they're is a sentiment found fill results with score and document
          if (!isEmpty(response.sentiment.document)) {
            results.sentiment = response.sentiment.document.label;
            results.score = response.sentiment.document.score;
          }
          res.json(results);
        }
      });
    })
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

module.exports = router;
