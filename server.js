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

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  delayMs: 0 // disabled
});

// only apply to requests that begin with /api/
app.use("/api/users", apiLimiter);

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
