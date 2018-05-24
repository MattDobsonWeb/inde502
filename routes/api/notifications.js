const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load Notification Model
const Notification = require("../../models/Notification");

// Load Post Model
const Post = require("../../models/Post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/ntofications/handle/:username
// @desc    Get notifications by handle
// @access  Public
router.get("/handle/:username", (req, res) => {
  const errors = {};

  // Check to see if user exists
  Profile.findOne({
    username: new RegExp("^" + req.params.username + "$", "i")
  })
    .then(profile => {
      // Find notifications from the database
      Notification.find({
        toUsername: new RegExp("^" + req.params.username + "$", "i")
      })
        .sort({ date: -1 })
        .then(notifications => {
          if (isEmpty(notifications))
            res
              .status(404)
              .json({ nonotificationsfound: "No notifications for this user" });
          else res.json(notifications);
        });
    })
    .catch(err => res.status(404).json({ nouserfound: "No user found" }));
});

// @route   GET api/notifications
// @desc    Get current users notifications
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      username: new RegExp("^" + req.user.username + "$", "i")
    })
      .then(profile => {
        Notification.find({
          toId: req.user.id
        })
          .sort({ date: -1 })
          .then(notifications => {
            if (isEmpty(notifications))
              res.status(404).json({
                nonotificationsfound: "No notifications for this user"
              });
            else res.json(notifications);
          });
      })
      .catch(err => res.status(404).json({ nouserfound: "No user found" }));
  }
);

// @route   POST api/notifications/update
// @desc    Set current notifications read to true
// @access  Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Notification.update(
      { toId: req.user.id },
      { read: true },
      { multi: true },
      function(res, err) {}
    );

    Notification.find({ toId: req.user.id, read: false }).then(
      notifications => {
        res.json(notifications.length);
      }
    );
  }
);

// @route   GET api/notifications/unread
// @desc    Get length of unread notifications
// @access  Private
router.get(
  "/unread",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // Find any unread notifications
    Notification.find({ toId: req.user.id, read: false }).then(
      notifications => {
        res.json({ amount: notifications.length });
      }
    );
  }
);

module.exports = router;
