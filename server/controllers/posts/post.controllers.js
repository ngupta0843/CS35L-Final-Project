const Posts = require("../../models/postModel.js");
const fs = require('fs');
const path = require('path');

const getPost = async (req, res) => {
  try {
    const { username, caption } = req.query;
    const post = await Posts.findOne({ username: username, caption: caption });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log(
      "-------------------------------------------------- getting post: ",
      post
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error getting post: ", error });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId, user } = req.body;
    if (!postId) {
      console.log(req);
      return res.status(400).json({ error: "Bad Post ID." });
    }

    const post = await Posts.findById(postId);

    if (post.likedUsers.includes(user)) {
      post.likedUsers = post.likedUsers.filter(
        (likedUser) => likedUser !== user
      );
      post.likecount = post.likecount - 1;
    } else {
      post.likecount = post.likecount + 1;
      post.likedUsers.push(user);
    }

    console.log("updatedPost: ", post);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      postID,
      postText,
      postAuthor,
      postCaption,
      postisText,
      postWorkoutTitle,
    } = req.query;
    const {image} = req.body;
    let postImage = image;
  
    // console.log('++++++++++++++++++++++++++++++++++', postImage)
    if (
      !postID ||
      !(postText || postImage) ||
      !postAuthor ||
      !postCaption ||
      !postisText
    ) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters." });
    }

    const newPost = new Posts({
      postID: postID,
      username: postAuthor,
      workout: postWorkoutTitle,
      caption: postCaption,
      photo: imagePath,
      text: postText,
      isTextPost: postisText,
      likecount: 0,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const fetchRandomPost = async (req, res) => {
  try {
    const totalPosts = await Posts.countDocuments();
    const randomPosts = await Posts.aggregate([{ $sample: { size: totalPosts } }]);
    res.status(200).json(randomPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random post", error });
  }
};

const getUserPosts = async(req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const posts = await Posts.find({ username: username });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for the user" });
    }
    console.log(
      "-------------------------------------------------- getting post: ",
      posts
    );
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Error getting post: ", error });
  }
};

module.exports = { likePost, createPost, getPost, fetchRandomPost, getUserPosts };
