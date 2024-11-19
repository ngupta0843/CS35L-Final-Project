// import React from 'react';
// import { 
//     Card, 
//     CardHeader, 
//     CardMedia, 
//     CardContent,
//     Typography, 
//     Avatar, 
//     IconButton
// } from '@mui/material';
// import PostActions from './PostActions';

// function Post({ username, location, profile_icon, caption, likesCount, timeAgo, post_img }){
//     return(
//         <Card sx={{ marginBottom: 2 }}>
//       <CardHeader
//         avatar={<Avatar alt={username} src={profile_icon} />}
//         title={username}
//         subheader={location}
//       />
//       <CardMedia component="img" height="400" image={post_img} alt="Post Image" />
//       <CardContent>
//         <PostActions />
//         <Typography variant="body2" color="text.secondary">
//           {likesCount} Likes
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {timeAgo}
//         </Typography>
//         <Typography variant="body1">
//           <strong>{username}</strong> {caption}
//         </Typography>
//       </CardContent>
//     </Card>
//     );
// }

// export default Post;

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

export {Post};
