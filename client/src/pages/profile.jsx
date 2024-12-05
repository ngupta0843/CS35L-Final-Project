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
  Card,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import Post from "./forum-page/Post.jsx";
import { CameraAlt, Edit } from "@mui/icons-material";
import profilePic from "../testimages/nikhil_profile_pic.png";
import post1 from "../testimages/post1.jpeg";
import post2 from "../testimages/post2.jpeg";
import post3 from "../testimages/post3.jpeg";
import SocialMediaPostUpload from "./upload_post";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "./UserProfile.css";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../components/redux/reducers/userReducer.js";

const posts = [post1, post2, post3];

const UserProfileHeader = ({ onCreatePostClick, currentUser, button }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstname: currentUser?.firstname || "",
    lastname: currentUser?.lastname || "",
    bio: currentUser?.bio || "",
  });
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const getUserList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8088/users/getUserList`
      );

      setUsers(response.data);
    } catch (error) {
      console.log("error from searching: ", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      let user = {
        firstname: profile.firstname,
        lastname: profile.lastname,
        bio: profile.bio,
        email: currentUser.email,
      };
      const request = await axios.put(
        "http://localhost:8088/users/updateProfile",
        { data: user }
      );
      console.log(request.data);

      try {
        dispatch(
          updateUser({
            firstname: request.data.user.name.split(" ")[0],
            lastname: request.data.user.name.split(" ")[1],
            bio: request.data.user.bio,
          })
        );
        toast.success("Profile updated successfully!");
      } catch (dispatchError) {
        console.log("Dispatch error: ", dispatchError);
        toast.error("Error updating profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
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
            <Box
              className="stat"
              sx={{ cursor: "pointer" }}
              onClick={() => setFollowingOpen(true)}
            >
              <Typography variant="h6" className="count">
                {currentUser?.followers?.length}
              </Typography>
              <Typography variant="body2">Followers</Typography>
            </Box>
            <Box
              className="stat"
              sx={{ cursor: "pointer" }}
              onClick={() => setFollowersOpen(true)}
            >
              <Typography variant="h6" className="count">
                {currentUser?.following?.length
                  ? currentUser?.following?.length
                  : 0}
              </Typography>
              <Typography variant="body2">Following</Typography>
            </Box>
          </Stack>
          <Box sx={{ marginTop: 3 }} className="bio">
            <Typography variant="body1">
              {currentUser.bio || "No bio yet!"}
            </Typography>
          </Box>
          {button && (
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
                onClick={() => setEditOpen(true)}
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

              <Dialog
                open={followersOpen}
                onClose={() => setFollowersOpen(false)}
                maxWidth="sm"
                sx={{
                  "& .MuiDialog-paper": {
                    borderRadius: 8,
                    backgroundColor: "rgb(30, 30, 30)",
                    color: "white",
                  },
                }}
                fullWidth
              >
                <DialogTitle>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Following List
                  </Typography>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => setFollowersOpen(false)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "gray",
                    }}
                  >
                    <Box sx={{ padding: 1 }}>
                      <CloseFullscreenIcon />
                    </Box>
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
                    <List sx={{ padding: 0 }}>
                      {currentUser?.following?.length > 0 ? (
                        currentUser?.following.map((follower, index) => (
                          <div key={index}>
                            <ListItem sx={{ paddingLeft: 2, paddingRight: 2 }}>
                              <Typography variant="body1">
                                {follower || "Unknown User"}
                              </Typography>
                            </ListItem>
                            {index < currentUser?.following?.length - 1 && (
                              <Divider />
                            )}
                          </div>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ textAlign: "center", padding: 2 }}
                        >
                          No followers found.
                        </Typography>
                      )}
                    </List>
                  </Box>
                </DialogContent>
              </Dialog>

              <Dialog
                open={followingOpen}
                onClose={() => setFollowingOpen(false)}
                maxWidth="sm"
                sx={{
                  "& .MuiDialog-paper": {
                    borderRadius: 8,
                    backgroundColor: "rgb(30, 30, 30)",
                    color: "white",
                  },
                }}
                fullWidth
              >
                <DialogTitle>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Followers List
                  </Typography>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => setFollowingOpen(false)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "gray",
                    }}
                  >
                    <Box sx={{ padding: 1 }}>
                      <CloseFullscreenIcon />
                    </Box>
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
                    <List sx={{ padding: 0 }}>
                      {currentUser?.followers?.length > 0 ? (
                        currentUser?.followers.map((follower, index) => (
                          <div key={index}>
                            <ListItem sx={{ paddingLeft: 2, paddingRight: 2 }}>
                              <Typography variant="body1">
                                {follower || "Unknown User"}
                              </Typography>
                            </ListItem>
                            {index < currentUser?.followers?.length - 1 && (
                              <Divider />
                            )}
                          </div>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ textAlign: "center", padding: 2 }}
                        >
                          No followers found.
                        </Typography>
                      )}
                    </List>
                  </Box>
                </DialogContent>
              </Dialog>

              <Dialog
                open={editOpen}
                onClose={() => setEditOpen(false)}
                fullWidth
                maxWidth="md"
                sx={{
                  "& .MuiDialog-paper": {
                    borderRadius: 8,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <DialogTitle
                    sx={{ m: 0, p: 0, fontSize: "1.5rem", fontWeight: 500 }}
                  >
                    Edit your Profile
                  </DialogTitle>

                  <IconButton
                    onClick={() => setEditOpen(false)}
                    sx={{ color: "#9e9e9e", "&:hover": { color: "#000" } }}
                  >
                    <Icon component={CloseFullscreenIcon} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "auto",
                    padding: 3,
                  }}
                >
                  <TextField
                    value={profile.firstname}
                    onChange={(e) => {
                      e.preventDefault();
                      setProfile({ ...profile, firstname: e.target.value });
                    }}
                    label="First Name"
                    variant="outlined"
                    sx={{ width: "80%", mt: 2 }}
                  />
                  <TextField
                    value={profile.lastname}
                    onChange={(e) => {
                      e.preventDefault();
                      setProfile({ ...profile, lastname: e.target.value });
                    }}
                    label="Last Name"
                    variant="outlined"
                    sx={{ width: "80%", mt: 2 }}
                  />
                  <TextField
                    value={profile.bio}
                    onChange={(e) => {
                      e.preventDefault();
                      setProfile({ ...profile, bio: e.target.value });
                    }}
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ width: "80%", mt: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={() => {
                      handleSaveProfile();
                      setEditOpen(false);
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Dialog>

              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="md"
                sx={{
                  "& .MuiDialog-paper": {
                    borderRadius: 8,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <DialogTitle
                    sx={{ m: 0, p: 0, fontSize: "1.5rem", fontWeight: 500 }}
                  >
                    Search for Users
                  </DialogTitle>

                  <IconButton
                    onClick={() => setOpen(false)}
                    sx={{ color: "#9e9e9e", "&:hover": { color: "#000" } }}
                  >
                    <Icon component={CloseFullscreenIcon} />
                  </IconButton>
                </Box>

                <DialogContent sx={{ px: 3, py: 2 }}>
                  <Autocomplete
                    options={users}
                    getOptionLabel={(option) =>
                      `${option.name} (${option.email})`
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search users by name or email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    )}
                    onChange={(e, value) => {
                      e.preventDefault();
                      setSelectedUser(value);
                      console.log(value);
                    }}
                    renderOption={(props, option) => (
                      <Box
                        {...props}
                        key={option._id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          py: 1,
                          px: 2,
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        {/* might have to debug this in the future if it gives issues with pfp loading */}
                        {!loading ? (
                          <Avatar sx={{ bgcolor: "#1976d2" }}>
                            {option.name ? option.name[0].toUpperCase() : "U"}
                          </Avatar>
                        ) : (
                          <CircularProgress />
                        )}

                        <Stack>
                          <Typography variant="body1">{option.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {option.email}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                  />

                  {/* Display selected user */}
                  {selectedUser && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6">Selected User</Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: "#1976d2" }}>
                          {selectedUser.name
                            ? selectedUser.name[0].toUpperCase()
                            : "U"}
                        </Avatar>
                        <Stack sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                console.log(selectedUser);
                                navigate(`/profile/${selectedUser.email}`);
                              }}
                            >
                              <Typography variant="body1">
                                {selectedUser.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {selectedUser.email}
                              </Typography>
                            </Box>
                            <Button
                              sx={{ ml: "auto" }}
                              onClick={sendFriendRequest}
                            >
                              Send a Friend Request
                            </Button>
                          </Box>
                        </Stack>
                      </Stack>
                    </Box>
                  )}
                </DialogContent>
              </Dialog>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

const UserProfilePosts = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8088/posts/getUserPosts?username=" + username
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  if (loading) {
    return (
      <Typography variant="h6" color="textSecondary">
        Loading posts...
      </Typography>
    );
  }

  if (posts.length === 0) {
    return (
      <Typography variant="h6" color="textSecondary">
        No posts available :\
      </Typography>
    );
  }

  return (
    <Box
      className="user-profile-posts"
      sx={{ width: "100%", paddingLeft: 2, paddingRight: 2 }}
    >
      <Card
        sx={{
          backgroundColor: "black",
          color: "white",
          borderRadius: 1,
        }}
      >
        <Grid container justifyContent="flex-start">
          {posts.map((post) => (
            <Grid
              key={post._id}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              sx={{ padding: 1 }}
            >
              <Post post={post} size="small" />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

const UserProfile = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user);
  console.log(currentUser);

  //check id of link here
  //logic -> put this inside of a use effect: if the current user from redux is the same as the user id in the link, show the buttons, otherwise dont
  // fetch user info from backend on every refresh
  const [buttons, setButtons] = useState(false);

  useEffect(() => {
    // check to see if viewed user is the same as current user
    if (id === currentUser.email) {
      setButtons(true);
    } else {
      setButtons(false);
    }
  }, [id, currentUser]);

  //post req

  const [openPostModal, setOpenPostModal] = useState(false);

  const handleOpenModal = () => {
    setOpenPostModal(true);
  };

  const handleCloseModal = () => {
    setOpenPostModal(false);
  };
  return (
    <div>
      <UserProfileHeader
        onCreatePostClick={handleOpenModal}
        currentUser={currentUser}
        button={buttons}
      />{" "}
      {/* Pass modal trigger to header */}
      {/* <img src={`data:image/jpeg;base64,${base64String}`} alt="Base64 Image" /> */}
      <UserProfilePosts username={id} />
      {/* The modal for creating a new post */}
      <SocialMediaPostUpload open={openPostModal} onClose={handleCloseModal} />
    </div>
  );
};

export default UserProfile;
