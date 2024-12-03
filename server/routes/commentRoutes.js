const express = require("express");
const { likeComment, createComment, deleteComment, updateComment, getComments } = require("../controllers/comment/comment.controllers.js");

const router = express.Router();

router.post("/createComment", createComment);
router.post("/updateComment", updateComment);
router.post("/deleteComment", deleteComment);
router.post("/getComments", getComments)
router.post("/likeComment",  likeComment)

module.exports = router;