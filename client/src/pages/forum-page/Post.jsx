import React from "react";
import PostActions from "./PostActions";

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
      return "80%";
  }
};

const PhotoPost = ({
  username,
  workout,
  caption,
  photo,
  likecount,
  user,
  size,
}) => {
  return (
    <Box sx={{ width: getPostSize(size), margin: "0 auto" }}>
      <Card sx={{ width: getPostSize(size) }}>
        <CardHeader
          avatar={<Avatar src={user.profile_photo} alt={user.name} />}
          title={username}
          subheader={workout}
        />
        <CardMedia
          component="img"
          height={getPostSize(size)}
          aspectRatio="1"
          image={photo}
          alt="Post"
          sx={{ objectFit: "square" }} // Makes sure the image scales well within the card
        />

        <CardContent>
          <PostActions />
          <Typography variant="body2" color="text.secondary">
            {likecount} Likes
          </Typography>
          <Typography variant="body1">
            <strong>{username}</strong> {caption}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const TextPost = ({ username, workout, caption, likecount, user, size }) => {
  return (
    <Box sx={{ width: getPostSize(size), margin: "0 auto" }}>
      <Card sx={{ width: getPostSize(size) }}>
        <CardHeader
          avatar={<Avatar src={user.profile_photo} alt={user.name} />}
          title={username}
          subheader={workout}
        />
        <CardContent>
          <Typography variant="body1" color="textPrimary">
            {caption}
          </Typography>
          <PostActions />
          <Typography variant="body2" color="text.secondary">
            {likecount} Likes
          </Typography>
          <Typography variant="body1">
            <strong>{username}</strong>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const Post = ({ username, workout, caption, photo, likecount, user, size }) => {
  const isPhotoPost = !!photo;

  return isPhotoPost ? (
    <PhotoPost
      username={username}
      workout={workout}
      caption={caption}
      photo={photo}
      likecount={likecount}
      user={user}
      size={size}
    />
  ) : (
    <TextPost
      username={username}
      workout={workout}
      caption={caption}
      likecount={likecount}
      user={user}
      size={size}
    />
  );
};

export default Post;
