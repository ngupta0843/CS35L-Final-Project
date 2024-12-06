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
import { useSelector } from "react-redux";

const getPostSize = (size) => {
  let width = "70%"; 
  let height = "auto"; 
  // switch (size) {
  //   case "small":
  //     width = "50%";
  //     height = "auto";
  //     break;
  //   case "medium":
  //     width = "80%";
  //     height = "auto";
  //     break;
  //   case "large":
  //     width = "100%";
  //     height = "auto";
  //     break;
  //   default:
  //     width = "70%";
  //     height = "auto";
  //     break;
  // }
  return { width, height };
};

function Post({ post, size = "medium" }) {
  const user = useSelector((state) => state.user)
  const { username, workout, caption, photo, likecount, isTextPost } = post;
  console.log(post);
  const default_profile_photo =
    "https://st4.depositphotos.com/5161043/23536/v/450/depositphotos_235367142-stock-illustration-fitness-logo-design-vector.jpg";
  var profilePhoto = user || default_profile_photo;
  if (profilePhoto === "null") {
    profilePhoto = default_profile_photo;
  }

  const { width, height } = getPostSize(size);

  return (
    <Box sx={{ width: '100%', margin: "0 auto" }}>
      <Card
        sx={{
          width: "40 vh",
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
            height={height}
            //aspectRatio="1"
            image={photo}
            alt="Post"
            sx={{ objectFit: "cover" }}
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
