const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const mognosse = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load Posts Model
const Post = require("../../models/Post");

// Load Noticiation Model
const Notification = require("../../models/Notification");

// @route   GET api/following/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Following Route Works" }));

// @route   POST api/following/follow/:handle
// @desc    Follow a user
// @access  Private
router.post(
  "/follow/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find profile of logged in user
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      // Find user to follow
      User.findOne({
        username: new RegExp("^" + req.params.username + "$", "i")
      })
        .then(user => {
          // Check to see if user is already following
          if (
            profile.following.filter(
              following => following.userId.toString() === user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyfollowing: "You're already following this user" });
          } else if (user.id === req.user.id) {
            return res
              .status(400)
              .json({ cannotfollow: "You cannot follow yourself" });
          }

          Profile.findOne({
            username: new RegExp("^" + req.params.username + "$", "i")
          })
            .then(userFollowed => {
              // Create new follower on person getting followed
              const newFollower = {
                username: req.user.username,
                userId: req.user.id,
                userAvatar: req.user.avatar
              };

              userFollowed.followers.unshift(newFollower);

              userFollowed.save();
            })
            .catch(err => res.status(404).json({ nouserfound: "error here" }));

          // Create new follow object
          const newFollow = {
            username: user.username,
            userId: user.id,
            userAvatar: user.avatar
          };

          // Create new notification
          const newFollowNotification = new Notification({
            toId: user.id,
            toUsername: user.username,
            fromId: req.user.id,
            fromUsername: req.user.username,
            fromAvatar: req.user.avatar,
            user: req.user.id,
            reference: req.user.username,
            type: "follow",
            read: false
          });

          newFollowNotification
            .save()
            .then(console.log("Follow notification Saved"));

          // Add to experience array
          profile.following.unshift(newFollow);

          profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json({ nouserfound: "No user found" }));
    });
  }
);

// @route   POST api/following/unfollow/:handle
// @desc    Unfollow a user
// @access  Private
router.post(
  "/unfollow/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      User.findOne({
        username: new RegExp("^" + req.params.username + "$", "i")
      })
        .then(user => {
          // Check to see if user is following
          if (
            profile.following.filter(
              following => following.userId.toString() === user.id
            ).length === 0
          ) {
            return res
              .status(400)
              .json({ notfollowing: "You're not yet following this user" });
          }

          Profile.findOne({
            username: new RegExp("^" + req.params.username + "$", "i")
          }).then(userUnfollowed => {
            // Get remove index
            const removeIndex = userUnfollowed.followers
              .map(item => item.userId.toString())
              .indexOf(req.user.id);

            // Splice out of array
            userUnfollowed.followers.splice(removeIndex, 1);

            // Save
            userUnfollowed.save();
          });

          // Get remove index
          const removeIndex = profile.following
            .map(item => item.userId.toString())
            .indexOf(user.id);

          // Splice out of array
          profile.following.splice(removeIndex, 1);

          // Save
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json({ nouserfound: "No user found" }));
    });
  }
);

// @route   GET api/following/posts
// @desc    Posts of users you follow
// @access  Private
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Make array of following users ids
      let userIds = [];
      // Add users
      userIds.push(req.user.id);

      // Map and send ids to array
      profile.following.map(following => {
        userIds.push(following.userId);
      });

      // Find posts in that array
      Post.find({
        user: { $in: userIds }
      })
        .sort("-date")
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nouserfound: "No posts found" }));
    });
  }
);

module.exports = router;
