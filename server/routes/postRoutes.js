const express = require("express");
const { likePost, createPost, getPost, fetchRandomPost, getUserPosts } = require("../controllers/posts/post.controllers.js");

const router = express.Router();
router.post("/likePost", likePost);
// router.get("/likePost", likePost);
router.post("/createPost", createPost);
router.get("/getPost", getPost);
router.get('/fetchRandomPost', fetchRandomPost);
router.get('/getUserPosts', getUserPosts);
module.exports = router;
