import React from "react";
import { Avatar, Button, Typography, Stack, Box, Grid } from "@mui/material";
import { Post } from "../components/posts/post";
import { CameraAlt, Edit } from "@mui/icons-material";
import profilePic from "../testimages/nikhil_profile_pic.png";
import post1 from "../testimages/post1.jpeg";
import post2 from "../testimages/post2.jpeg";
import post3 from "../testimages/post3.jpeg";
import './UserProfile.css';

const posts = [post1, post2, post3];

const UserProfileHeader = () => {
    return (
        <Box className="user-profile-header">
            <Stack direction="row" spacing={4} alignItems="center">
                <Avatar
                    alt="Nikhil"
                    src={profilePic}
                    className="avatar"
                />
                <Box>
                    <Typography className="name">Nikhil</Typography>
                    <Typography className="username">@nikhil_singh</Typography>
                    <Stack direction="row" spacing={4} sx={{ marginTop: 2 }} className="stats">
                        <Box className="stat">
                            <Typography variant="h6" className="count">100</Typography>
                            <Typography variant="body2" >Posts</Typography>
                        </Box>
                        <Box className="stat">
                            <Typography variant="h6" className="count">1.2k</Typography>
                            <Typography variant="body2" >Followers</Typography>
                        </Box>
                        <Box className="stat">
                            <Typography variant="h6" className="count">500</Typography>
                            <Typography variant="body2" >Following</Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ marginTop: 3 }} className="bio">
                        <Typography variant="body1">
                            Enjoying life, traveling, and capturing moments 📸
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        className="edit-button"
                        startIcon={<Edit />}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

const UserProfilePosts = () => {
    return (
        <Box className="user-profile-posts">
            <Typography variant="h5" className="title">Posts</Typography>
            <Stack  className="posts-container">
                {posts.map((post, index) => (
                    <Post
                        key={index}
                        username="Nikhil"
                        workout="Leg Day"
                        caption="Leg day is the best day!"
                        photo={post}
                        likecount={100}
                        user={{ profile_photo: profilePic, name: "Nikhil" }}
                        size={"small"}
                    />
                ))}
            </Stack>
        </Box>
    );
};

const UserProfile = () => {
    return (
        <div>
            <UserProfileHeader />
            <UserProfilePosts />
        </div>
    );
};

export default UserProfile;
