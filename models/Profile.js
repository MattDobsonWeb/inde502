const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  displayname: {
    type: String
  },
  bio: {
    type: String,
    max: 150
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  birthday: {
    type: Date
  },
  posts: [
    {
      id: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
