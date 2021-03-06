const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const rp = require("request-promise");
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

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   POST api/posts
// @desc    Create posts
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Find if user inputs a movie ID or title!
    if (req.body.movie) {
      // If post starts with TT it is an IMDB ID
      if (req.body.movie.startsWith("tt") && req.body.movie.length == 9) {
        // Pull film info from database by ID
        rp
          .get(
            `https://api.themoviedb.org/3/find/${req.body.movie}?api_key=${
              keys.TMDBkey
            }&external_source=imdb_id`,
            {
              json: true
            }
          )
          .then(data => {
            // If the film is not found
            if (isEmpty(data.movie_results) && isEmpty(data.tv_results)) {
              res.status(404).json({
                movie:
                  "There is no movie found with that ID, make sure you're inputting the ID as seen in the IMDB URL"
              });
            } else if (isEmpty(data.movie_results)) {
              // If the movie_results is empty it must be a TV show
              // Create new post with TV show
              const newPost = new Post({
                text: req.body.text,
                username: req.user.username,
                movieTitle: data.tv_results[0].name,
                movieId: data.tv_results[0].id,
                movieMedia: "tv",
                avatar: req.user.avatar,
                user: req.user.id
              });

              // Save the post
              newPost.save().then(post => res.json(post));
            } else {
              // If it's a movie make movieMedia "movie"
              const newPost = new Post({
                text: req.body.text,
                username: req.user.username,
                movieTitle: data.movie_results[0].title,
                movieId: data.movie_results[0].id,
                movieMedia: "movie",
                avatar: req.user.avatar,
                user: req.user.id
              });

              // Save the post
              newPost.save().then(post => res.json(post));
            }
          });
      } else {
        // If it is not an IMDB ID, the user has inputted a title
        // Find the exact title from the movie database and create new post
        rp
          .get(
            `https://api.themoviedb.org/3/search/multi?api_key=${
              keys.TMDBkey
            }&language=en-US&query=${req.body.movie}&page=1
            }`,
            {
              json: true
            }
          )
          .then(data => {
            // If no data is returned run error.
            if (isEmpty(data.results)) {
              res.status(404).json({
                movie:
                  "There is no movie found with that title, make sure you're inputting the title as seen on The Movie Database"
              });
            } else {
              // This checks if it's a movie or a TV series
              // If its a movie it will have a title
              // If TV series it will have a name instead
              const title = data.results[0].title
                ? data.results[0].title
                : data.results[0].name;

              // Create the new post
              const newPost = new Post({
                text: req.body.text,
                username: req.user.username,
                movieTitle: title,
                movieId: data.results[0].id,
                movieMedia: data.results[0].media_type,
                avatar: req.user.avatar,
                user: req.user.id
              });

              // Save the post
              newPost.save().then(post => res.json(post));
            }
          });
      }
    } else {
      // If no movie is in the post
      const newPost = new Post({
        text: req.body.text,
        username: req.user.username,
        avatar: req.user.avatar,
        user: req.user.id
      });

      // Save the post
      newPost.save().then(post => res.json(post));
    }
  }
);

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

// @route   GET api/posts/user/:username
// @desc    Get post by username
// @access  Public
router.get("/user/:username", (req, res) => {
  // Check if user exists by finding username
  Profile.findOne({
    username: new RegExp("^" + req.params.username + "$", "i")
  })
    .then(profile => {
      // Return their posts
      Post.find({ user: profile.user })
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
    })
    .catch(err => res.status(404).json({ nouserfound: "No user found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check if post belongs to logged in user
          if (post.user.toString() !== req.user.id && !req.user.admin) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Create a new notification to send to post owner
          const newNotification = {
            toId: post.user,
            toUsername: post.username,
            fromId: req.user.id,
            fromUsername: req.user.username,
            fromAvatar: req.user.avatar,
            user: req.user.id,
            reference: post.id,
            type: "like",
            read: false
          };

          // Add user ID to likes array
          post.likes.unshift({ user: req.user.id });

          // Check to see if its the users own post, if it is, don't send notification
          if (newNotification.toUsername !== newNotification.fromUsername) {
            new Notification(newNotification)
              .save()
              .then(console.log("Like notification Saved"));
          }

          // Save post to DB
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          username: req.user.username,
          avatar: req.user.avatar,
          user: req.user.id
        };

        // Create a new notification to send to the user
        const newNotification = {
          toId: post.user,
          toUsername: post.username,
          fromId: req.user.id,
          fromUsername: req.user.username,
          fromAvatar: req.user.avatar,
          user: req.user.id,
          reference: post.id,
          type: "comment",
          read: false
        };

        // Add users name to array so that it doesn't receive notification
        let uniqueUser = [];
        uniqueUser.push(req.user.username, post.username);

        // Send notifications to others that have commented on the post!
        post.comments.map(comment => {
          if (!uniqueUser.includes(comment.username)) {
            uniqueUser.push(comment.username);

            // Create a notification to send to users whom have commented on the post also
            const newReplyNotification = new Notification({
              toId: comment.user,
              toUsername: comment.username,
              fromId: req.user.id,
              fromUsername: req.user.username,
              fromAvatar: req.user.avatar,
              user: req.user.id,
              reference: post.id,
              type: "commentReply",
              read: false
            });

            newReplyNotification
              .save()
              .then(console.log("Reply notification Saved"));
          }
        });

        // Check to see if its the users own post, if it is, don't send notification
        if (newNotification.toUsername !== newNotification.fromUsername) {
          new Notification(newNotification)
            .save()
            .then(console.log("Comment notification Saved"));
        }

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get commment
        const commentCheck = post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        );

        // Check if comment is posted by user
        if (
          commentCheck[0].user.toString() !== req.user.id &&
          !req.user.admin
        ) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
