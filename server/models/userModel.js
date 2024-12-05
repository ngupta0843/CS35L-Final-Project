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
  following: {
    type: Array,
  },
  posts: {
    type: JSON,
  },
  saved_workouts: {
    type: JSON,
  },
  comments: [
    {
      type: String,
      default: [],
      sparse: true,
    },
  ]
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
