const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  postID: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  workout: {
    type: String,
    required: false
  },
  caption: {
    type: String,
    required: true
  },
  likecount: {
    type: Number,
    default: 0
  },
  photo: {
    type: String // filepath of photo
  },
  text: {
    type: String
  },
  isTextPost: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'], 
    default: 'medium'
  },
  comments: {
    type: Array,
    default: []
  }
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;

