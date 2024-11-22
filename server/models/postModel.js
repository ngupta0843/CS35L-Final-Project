const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  workout: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: false
  },
  likecount: {
    type: Number,
    default: 0
  },
  photo: {
    type: String // filepath of photo
  },
  isPhotoPost: {
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

