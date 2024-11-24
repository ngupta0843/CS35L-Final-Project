const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  username: {
    type: String,
  },
  userID:{
    type: String
  },
  commentID: {
    type: String,
    required: true
  },
  parentPostID: {
    type: String,
    required: true
  },
//   parentCommentID:{
//     type: String,
//   },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;