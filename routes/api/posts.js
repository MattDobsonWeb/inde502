const express = require("express");
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Post Works" }));

// Export router so server.js can pick it up
module.exports = router;
