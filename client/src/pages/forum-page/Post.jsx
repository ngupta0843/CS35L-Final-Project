
import React from 'react';
import PostActions from './PostActions';
import './Post.css'
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

const PhotoPost = ({ username, workout, caption, photo, likecount, user, size }) => {
    return (
      <Box sx={{ width: getPostSize(size), margin: '0 auto'}}>
        <Card 
          sx={{ width: getPostSize(size), 
          backgroundColor: 'black', 
          color: 'white', 
          border: '2px solid black', 
          borderRadius: '10px'}}>
            
          <CardHeader
            avatar={
              <Avatar
                src={user.profile_photo}
                alt={user.name}
              />
            }
            title={<strong>{username}</strong>}
            subheader={workout}
            titleTypographyProps={{ sx: { color: 'white' } }}
            subheaderTypographyProps={{ sx: { color: 'white' } }}
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
            <PostActions />
            <Typography variant="body2" color="white">
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
      <Box sx={{ width: getPostSize(size), margin: '0 auto' }}>
        <Card sx={{ 
          width: getPostSize(size), 
          backgroundColor: 'black', 
          color: 'white', 
          border: '2px solid black', 
          borderRadius: '10px'}}>

          <CardHeader
            avatar={
              <Avatar
                src={user.profile_photo}
                alt={user.name}
              />
            }
            title={<strong>{username}</strong>}
            subheader={workout}
            titleTypographyProps={{ sx: { fontweight: 'bold', color: 'white' } }}
            subheaderTypographyProps={{ sx: { color: 'white' } }}
          />
          <CardContent>
            <Typography variant="body1" color="white">
              {caption}
            </Typography>
            <PostActions />
            <Typography variant="body2" color="white">
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
      <PhotoPost username={username} workout={workout} caption={caption} photo={photo} likecount={likecount} user={user} size={size} />
    ): (
      <TextPost username={username} workout={workout} caption={caption} likecount={likecount} user={user} size={size} />
    );
  };

export default Post;
