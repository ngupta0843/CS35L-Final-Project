const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  bio: {
    type: String,
  },
  profile_photo: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  follower_requests: {
    type: Array,
  },
  following: {
    type: JSON,
  },
  posts: {
    type: JSON,
  },
  saved_workouts: {
    type: JSON,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
