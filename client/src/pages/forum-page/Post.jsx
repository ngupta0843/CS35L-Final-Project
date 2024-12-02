import React from "react";
import PostActions from "./PostActions";
import "./Post.css";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
} from "@mui/material";

const getPostSize = (size) => {
  switch (size) {
    case "small":
      return "50%";
    case "medium":
      return "80%";
    case "large":
      return "100%";
    default:
      return "70%";
  }
};

function Post({ post, size = "medium" }) {
  const { username, workout, caption, photo, likecount, isTextPost } = post;
  console.log(post);
  const default_profile_photo =
    "https://st4.depositphotos.com/5161043/23536/v/450/depositphotos_235367142-stock-illustration-fitness-logo-design-vector.jpg";
  var profilePhoto = post.photo || default_profile_photo;
  if (profilePhoto === "null") {
    profilePhoto = default_profile_photo;
  }
  return (
    <Box sx={{ width: getPostSize(size), margin: "0 auto" }}>
      <Card
        sx={{
          width: "1000px",
          backgroundColor: "black",
          color: "white",
          border: "2px solid white",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          avatar={<Avatar src={profilePhoto} alt={username} />}
          title={<strong>{username}</strong>}
          subheader={workout}
          titleTypographyProps={{ sx: { fontweight: "bold", color: "white" } }}
          subheaderTypographyProps={{ sx: { color: "white" } }}
        />
        {!isTextPost && (
          <CardMedia
            component="img"
            height={getPostSize(size)}
            aspectRatio="1"
            image={photo}
            alt="Post"
            sx={{ objectFit: "square" }}
          />
        )}
        <CardContent>
          {!isTextPost && <PostActions post={post} />}
          <Typography
            variant="body1"
            color="white"
            sx={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {(!isTextPost && (
              <>
                <strong>{username}</strong>
                <span style={{ marginLeft: "0.3rem" }}>{caption}</span>
              </>
            )) ||
              caption}
          </Typography>
          {isTextPost && (
            <>
              <PostActions post={post} />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Post;
