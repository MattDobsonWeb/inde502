const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");
const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");
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

// @route   GET api/admin/posts/days/:days
// @desc    Get posts x number of days
// @access  Public
router.get(
  "/posts/analyze/tone",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    let toneAnalyzer = new ToneAnalyzerV3({
      username: "4c2cb7d8-d6c2-487b-b276-a302fb5afc2b",
      password: "ti8fCYsAmYmI",
      version: "2017-09-21",
      url: "https://gateway.watsonplatform.net/tone-analyzer/api/"
    });

    const text =
      "Team, I know that times are tough! Product sales have been disappointing for the past three quarters. We have a competitive product, but we need to do a better job of selling it!";

    const toneParams = {
      tone_input: { text: text },
      content_type: "application/json"
    };

    toneAnalyzer.tone(toneParams, function(error, analysis) {
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.stringify(analysis, null, 2));
        res.json;
      }
    });
    0;
  }
);

// @route   GET api/admin/posts
router.get("/analyze/media/:id", (req, res) => {
  Post.find({ movieId: req.params.id })
    .sort({ date: -1 })
    .then(posts => {
      let textArray = [];

      posts.map(post => {
        textArray.push({
          text: post.text
        });
      });

      let toneAnalyzer = new ToneAnalyzerV3({
        username: "4c2cb7d8-d6c2-487b-b276-a302fb5afc2b",
        password: "ti8fCYsAmYmI",
        version: "2017-09-21",
        url: "https://gateway.watsonplatform.net/tone-analyzer/api/"
      });

      var toneChatParams = {
        utterances: textArray
      };

      let results = {
        title: posts[0].movieTitle,
        media: posts[0].movieMedia,
        posts: posts.length,
        tones: {
          Sad: 0,
          Frustrated: 0,
          Satisfied: 0,
          Excited: 0,
          Polite: 0,
          Impolite: 0,
          Sympathetic: 0,
          Neutral: 0
        }
      };

      toneAnalyzer.toneChat(toneChatParams, function(error, analysis) {
        if (error) {
          res.json(error);
        } else {
          analysis.utterances_tone.map(analysis => {
            if (!isEmpty(analysis.tones[0])) {
              const toneType = analysis.tones[0].tone_name;

              if (toneType === "Sad") {
                results.tones.Sad++;
              } else if (toneType === "Frustrated") {
                results.tones.Frustrated++;
              } else if (toneType === "Satisfied") {
                results.tones.Satisfied++;
              } else if (toneType === "Excited") {
                results.tones.Excited++;
              } else if (toneType === "Polite") {
                results.tones.Polite++;
              } else if (toneType === "Impolite") {
                results.tones.Impolite++;
              } else if (toneType === "Sympathetic") {
                results.tones.Sympathetic++;
              }
            } else {
              results.tones.Neutral++;
            }
          });
          res.json(results);
        }
      });
      0;
    })
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));

  // Post.findById(req.params.id)
  //   .then(post => {
  //     let toneAnalyzer = new ToneAnalyzerV3({
  //       username: "4c2cb7d8-d6c2-487b-b276-a302fb5afc2b",
  //       password: "ti8fCYsAmYmI",
  //       version: "2017-09-21",
  //       url: "https://gateway.watsonplatform.net/tone-analyzer/api/"
  //     });

  //     let textArray = [];

  //     textArray.push({
  //       text: post.text
  //     });

  //     var toneChatParams = {
  //       utterances: textArray
  //     };

  //     toneAnalyzer.toneChat(toneChatParams, function(error, analysis) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log(JSON.stringify(analysis, null, 2));
  //         res.json(analysis);
  //       }
  //     });
  //     0;

  //     res.json(textArray);
  //   })
  //   .catch(err =>
  //     res.status(404).json({ nopostfound: "No post found with that ID" })
  //   );
});

module.exports = router;
