const express = require("express");
const { likeComment, createComment, deleteComment, editComment, getComments } = require("../controllers/comment/comment.controllers.js");

const router = express.Router();

router.post("/createComment", createComment);
router.post("/editComment", editComment);
router.post("/deleteComment", deleteComment);
router.post("/getComments", getComments)
router.post("/likeComment",  likeComment)

module.exports = router;