const express = require("express");
const { likePost, createPost } = require("../controllers/posts/post.controllers.js");

const router = express.Router();
router.post("/likePost", likePost);
router.get("/likePost", likePost);
router.post("/createPost", createPost);

module.exports = router;
