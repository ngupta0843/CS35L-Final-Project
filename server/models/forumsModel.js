const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: {
    type: String,
  },
  userId:{
    type: String
  },
  postID: {
    type: String,
  },
  parentID:{
    type: String,
  },
//   profile_photo: {
//     type: String,
//     required: true,
//   },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200,
  },
  message: {
    type: String,
    required: true,
  },
  thread: [{
    type: String,
    required: true,
    default: [],
  }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;