import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import nikhil from "../../testimages/nikhil_profile_pic.png";
import sachit from "../../testimages/post1.jpeg";
import { Avatar, Stack, Button, Box, Typography, Paper } from "@mui/material";
import "./ForumPage.css";
function ForumPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchRandomPost = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8088/posts/fetchRandomPost"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching random posts:", error);
      }
    };
    fetchRandomPost();
  }, []);

  return (
    <Box className="forum-page" sx={{ flex: 1, padding: 5, paddingLeft: 40 }}>
      <Stack direction="row" spacing={3}>
        {posts.map((post, index) => (
          <Post
            post={post}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default ForumPage;
