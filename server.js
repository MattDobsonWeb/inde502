const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");
const RateLimit = require("express-rate-limit");

// Bring in API routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const movies = require("./routes/api/movies");
const notifications = require("./routes/api/notifications");
const following = require("./routes/api/following");
const search = require("./routes/api/search");
const admin = require("./routes/api/admin");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Limit api requests
var searchLimiter = new RateLimit({
  windowMs: 10 * 1000, // 10 second window
  delayMs: 0, // slow down subsequent responses by 3 seconds per request
  max: 30, // start blocking after 5 requests
  message: "Too many requests made",
  headers: true
});

app.use("/api/", searchLimiter);

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// enable ssl redirect
app.use(sslRedirect());

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
app.use("/api/admin", admin);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// For heroku use env.port, or locally run on port 5000
const port = process.env.PORT || 5000;

// Console log if server is running
app.listen(port, () => console.log(`Server running on port ${port}`));
