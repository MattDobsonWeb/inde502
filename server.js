const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Bring in API routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const movies = require("./routes/api/movies");
const notifications = require("./routes/api/notifications");
const following = require("./routes/api/following");
const search = require("./routes/api/search");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/movies", movies);
app.use("/api/notifications", notifications);
app.use("/api/following", following);
app.use("/api/search", search);

// For heroku use env.port, or locally run on port 5000
const port = process.env.PORT || 5000;

// Console log if server is running
app.listen(port, () => console.log(`Server running on port ${port}`));
