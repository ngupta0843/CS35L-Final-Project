import React from "react";
import Post from './Post';
import nikhil from '../../testimages/nikhil_profile_pic.png';
import sachit from '../../testimages/post1.jpeg';
import { Avatar, Stack } from "@mui/material";
function ForumPage() {
    const posts = [
        {
            id: 1,
            username: 'user1',
            location: 'New York',
            profile_icon: nikhil,
            caption: 'hello',
            likesCount: 100,
            post_img: sachit,
            workout: "squats",
        },
        {
            id: 2,
            username: 'user2',
            location: 'De Neve',
            profile_icon: nikhil,
            caption: 'hi',
            likesCount: 200,
        }
    ];

    return(
        <div className="forum-page">
            <Stack>
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
        </div>
    );
}


export default ForumPage;