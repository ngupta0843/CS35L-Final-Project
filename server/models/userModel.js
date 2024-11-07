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
  photos: {
    type: Array,
  }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;

