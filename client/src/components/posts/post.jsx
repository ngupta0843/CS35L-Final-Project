import React from 'react';
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
          <CardMedia
            component="img"
            height={getPostSize(size)}
            aspectRatio="1"
            image={photo}
            alt="Post"
            sx={{objectFit: 'square' }} // Makes sure the image scales well within the card
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {caption}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  };

export {Post};
