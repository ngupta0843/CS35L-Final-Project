const express = require("express");
const { createComment, deleteComment, updateComment } = require("../controllers/comment/comment.controllers.js");

const router = express.Router();

router.post("/createComment", createComment);
router.post("/updateComment", updateComment);
router.post("/deleteComment", deleteComment);

module.exports = router;