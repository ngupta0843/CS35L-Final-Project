import React, { useEffect, useState, useCallback } from "react";
import {
  Avatar,
  Button,
  Typography,
  Stack,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Icon,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { Post } from "../components/posts/post";
import { CameraAlt, Edit } from "@mui/icons-material";
import profilePic from "../testimages/nikhil_profile_pic.png";
import post1 from "../testimages/post1.jpeg";
import post2 from "../testimages/post2.jpeg";
import post3 from "../testimages/post3.jpeg";
import SocialMediaPostUpload from "./upload_post";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "./UserProfile.css";

const posts = [post1, post2, post3];

const UserProfileHeader = ({ onCreatePostClick }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = useSelector((state) => state.user);

  const getUserList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8088/users/getUserList`
      );

      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log("error from searching: ", error);
    }
  };

  const sendFriendRequest = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8088/users/sendFriendRequest", {
        cur_user: currentUser.email,
        req_user: selectedUser.email,
      });
      toast.success("Friend request sent!");
    } catch (error) {
      console.log("error from searching: ", error);
      if (error.response.status === 400) {
        toast.error("You are already friends with this user!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box className="user-profile-header">
      <Stack direction="row" spacing={4} alignItems="center">
        <Avatar alt="Nikhil" src={profilePic} className="avatar" />
        <Box>
          <Typography className="name">
            {currentUser.firstname} {currentUser.lastname}
          </Typography>
          <Typography className="username">{currentUser.email}</Typography>
          <Stack
            direction="row"
            spacing={4}
            sx={{ marginTop: 2 }}
            className="stats"
          >
            <Box className="stat">
              <Typography variant="h6" className="count">
                100
              </Typography>
              <Typography variant="body2">Posts</Typography>
            </Box>
            <Box className="stat">
              <Typography variant="h6" className="count">
                1.2k
              </Typography>
              <Typography variant="body2">Followers</Typography>
            </Box>
            <Box className="stat">
              <Typography variant="h6" className="count">
                500
              </Typography>
              <Typography variant="body2">Following</Typography>
            </Box>
          </Stack>
          <Box sx={{ marginTop: 3 }} className="bio">
            <Typography variant="body1">
              Enjoying life, traveling, and capturing moments 📸
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              className="edit-button"
              startIcon={<Edit />}
            >
              Edit Profile
            </Button>
            {/* Button to open modal for creating a post */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<CameraAlt />}
              sx={{ marginTop: 2 }}
              onClick={onCreatePostClick}
            >
              Create a Post
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CameraAlt />}
              sx={{
                marginTop: 2,
              }}
              onClick={() => {
                getUserList();
                setOpen((prev) => !prev);
              }}
            >
              Search for users
            </Button>
            
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

const UserProfilePosts = () => {
  return (
    <Box className="user-profile-posts">
      <Typography variant="h5" className="title">
        Posts
      </Typography>
      <Stack className="posts-container">
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

const VisitedUser = () => {
  const [openPostModal, setOpenPostModal] = useState(false); // State to control modal visibility

  const handleOpenModal = () => {
    setOpenPostModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenPostModal(false); // Close the modal
  };

  return (
    <div>
      <UserProfileHeader onCreatePostClick={handleOpenModal} />{" "}
      {/* Pass modal trigger to header */}
      <UserProfilePosts />
      {/* The modal for creating a new post */}
      <SocialMediaPostUpload open={openPostModal} onClose={handleCloseModal} />
    </div>
  );
};

export default VisitedUser;
