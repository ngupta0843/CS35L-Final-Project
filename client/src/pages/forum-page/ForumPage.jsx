import React from "react";
import Post from './Post';
import nikhil from '../../testimages/nikhil_profile_pic.png';
import sachit from '../../testimages/post1.jpeg';
import { Avatar, Stack, Button, Box, Typography, Paper } from "@mui/material";
import './ForumPage.css';
function ForumPage() {
    const posts = [
        {
            id: 1,
            username: 'user1',
            location: 'New York',
            profile_icon: nikhil,
            caption: 'hifdsjfksadjfkl;sajfkl;sajfklsa;jfkl;asjf;lsadjfls;afkjklas;dfjksl;jfklds;afjklas;dfjkal;ajdfjskald;fjsakl;dfjksl;ajfkl;sajfkl;sajdklas',
            likesCount: 100,
            post_img: sachit,
            workout: "squats",
        },
        {
            id: 2,
            username: 'user2',
            location: 'De Neve',
            profile_icon: nikhil,
            caption: 'hifdsjfksadjfkl;sajfkl;sajfklsa;jfkl;asjf;lsadjfls;afkjklas;dfjksl;jfklds;afjklas;dfjkal;ajdfjskald;fjsakl;dfjksl;ajfkl;sajfkl;sajdklas',
            likesCount: 200,
        }
    ];

    return(
        <Box className="forum-page" sx={{ flex: 1, padding: 5, paddingLeft: 40 }}>
            <Stack spacing={3}>
            {posts.map(post => (
                <Post
                    key={post.id}
                    username={post.username}
                    location={post.location}
                    caption={post.caption}
                    likecount={post.likesCount}
                    user={{profile_photo: post.profile_icon}}
                    photo={post.post_img}
                    workout={post.workout}
                />
            ))}
            </Stack>
        </Box>
    );
}

export default ForumPage;
