import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { Avatar, Stack, Button, Box, Typography, Paper } from "@mui/material";
import "./ForumPage.css";

function ForumPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchRandomPost = async () => {
      try {
        const response = await axios.get("http://localhost:8088/posts/fetchRandomPost");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching random posts:", error);
      }
    };
    fetchRandomPost();
  }, []);

  return (
    <Box
      className="forum-page"
      sx={{
        flex: 1,
        minHeight: '100vh',
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Stack
        direction="column"
        spacing={3}
        padding={4}
        sx={{
          width: '100%',
          maxWidth: 800,
          justifyContent: 'center',
          marginLeft: '65px',
        }}
      >
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </Stack>
    </Box>
  );
}

export default ForumPage;
