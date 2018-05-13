const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Notification Schema
const NotificationSchema = new Schema({
  toId: {
    type: String
  },
  toUsername: {
    type: String
  },
  fromId: {
    type: String
  },
  fromUsername: {
    type: String
  },
  fromAvatar: {
    type: String
  },
  reference: {
    type: String
  },
  type: {
    type: String
  },
  read: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
