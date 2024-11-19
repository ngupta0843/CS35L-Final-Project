
import React from 'react';
import PostActions from './PostActions';

import { Box, Card, CardMedia, CardContent, CardHeader, Avatar, Typography } from '@mui/material';

const getPostSize = (size) => {
  switch (size) {
    case 'small':
      return '50%';
    case 'medium':
      return '80%';
    case 'large':
      return '100%';
    default:
      return '80%';
  }
};

const Post = ({ username, workout, caption, photo, likecount, user, size }) => {
    const isPhotoPost = !!photo;  // it's a photopost if there is a photo
    return (
      <Box sx={{ width: getPostSize(size), margin: '0 auto' }}>
        <Card sx={{ width: getPostSize(size) }}>
          <CardHeader
            avatar={
              <Avatar
                src={user.profile_photo}
                alt={user.name}
              />
            }
            title={username}
            subheader={workout}
          />
          {isPhotoPost && ( // render only if it's a photopost
              <CardMedia
                component="img"
                height={getPostSize(size)}
                aspectRatio="1"
                image={photo}
                alt="Post"
                sx={{objectFit: 'square' }} // Makes sure the image scales well within the card
              />
            )}
          
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

export default Post;
