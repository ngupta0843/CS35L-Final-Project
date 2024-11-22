import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  TextField, 
  Typography, 
  FormControlLabel, 
  Switch, 
  Card, 
  CardMedia, 
  useMediaQuery
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import axios from "axios";
import {useSelector} from "react-redux";

const SocialMediaPostUpload = ({ open, onClose }) => {
  const [isTextPost, setIsTextPost] = useState(false); // State to track if it's a text or photo post
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [caption, setCaption] = useState(''); // State for the caption
  const [postContent, setPostContent] = useState(''); // State for the post content
  const [photo, setPhoto] = useState(null);
  const user = useSelector((state) => state.user);

  const handleSwitchChange = () => {
    setIsTextPost(!isTextPost);
    setPostContent(''); // Reset post content when switching between text and image
    setCaption(''); // Optional: Reset caption too when switching, but can leave this unchanged if desired
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Temporarily display the selected photo
    }
  };

  const handleSubmit = async () => {
    const responseUserSchema = await axios.get("http://localhost:8088/users/currentUser?id=" + user.email);
    const userSchema = responseUserSchema.data;
    const postID = user.email + userSchema.profile_photo.length;
    //postID, postText, postImage, postAuthor, postCaption, postisText, postWorkoutTitle
    const response = await axios.post("http://localhost:8088/posts/createPost?postID=" + postID + "&postText=" + postContent + "&postImage=" + photo + "&postAuthor=" + user.email + "&postCaption=" + caption + "&postisText=" + isTextPost + "&postWorkoutTitle=" + workoutTitle);
    console.log(response);
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          height: "80%",
          margin: "auto",
          borderRadius: "20px",
          backgroundColor: "#1e1e1e", // Lighter dark background
        },
      }}
    >
      <DialogTitle sx={{ color: "#fff" }}>Create a Social Media Post</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
        <Box sx={{ my: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isTextPost}
                onChange={handleSwitchChange}
                name="isTextPost"
                sx={{
                  color: "#fff", 
                  '&.Mui-checked': {
                    color: "#008ABB", // Change the switch color when it's checked
                  },
                }}
              />
            }
            label={isTextPost ? "Text Post" : "Photo Post"}
            sx={{
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* If it's a photo post, allow the user to upload a photo */}
        {!isTextPost && (
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff" }}>Upload a Photo</Typography>
            <input
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="upload-photo"
            />
            <label htmlFor="upload-photo">
              <Button 
                variant="contained" 
                component="span"
                sx={{
                  backgroundColor: "#008ABB", 
                  color: "#fff", 
                  '&:hover': { backgroundColor: "#006C8A" }, // Button hover effect
                  borderRadius: "10px",
                }}
              >
                Choose Photo
              </Button>
            </label>
            {photo && (
              <Card sx={{ mt: 2, maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo}
                  alt="Uploaded Photo"
                />
              </Card>
            )}
          </Box>
        )}

        {/* Text Post Content (Distinct from Caption) */}
        {isTextPost && (
          <Box sx={{ my: 3 }}> {/* Increased spacing to distinguish from other elements */}
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Enter your post content"
              value={postContent} // Binding to postContent
              onChange={(e) => setPostContent(e.target.value)}
              sx={{
                backgroundColor: "#333",  // Dark background for text field
                '& .MuiOutlinedInput-root': {
                  backgroundColor: "#333",  // Input background color
                  '&:hover fieldset': {
                    borderColor: "#008ABB",  // Hover border color
                  },
                },
                '& .MuiInputLabel-root': {
                  color: "#fff",  // Label color
                },
                '& .MuiInputBase-input': {
                  color: "#fff",  // Input text color
                },
              }}
            />
          </Box>
        )}

        {/* Optional workout title */}
        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Workout Title (Optional)"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            sx={{
              backgroundColor: "#333",  // Dark background for text field
              '& .MuiOutlinedInput-root': {
                backgroundColor: "#333",  // Input background color
                '&:hover fieldset': {
                  borderColor: "#008ABB",  // Hover border color
                },
              },
              '& .MuiInputLabel-root': {
                color: "#fff",  // Label color
              },
              '& .MuiInputBase-input': {
                color: "#fff",  // Input text color
              },
            }}
          />
        </Box>

        {/* Caption */}
        <Box sx={{ my: 3 }}> {/* Added more spacing for distinction */}
          <TextField
            fullWidth
            variant="outlined"
            label="Caption"
            value={caption} // Binding to caption
            onChange={(e) => setCaption(e.target.value)}
            sx={{
              backgroundColor: "#333",  // Dark background for text field
              '& .MuiOutlinedInput-root': {
                backgroundColor: "#333",  // Input background color
                '&:hover fieldset': {
                  borderColor: "#008ABB",  // Hover border color
                },
              },
              '& .MuiInputLabel-root': {
                color: "#fff",  // Label color
              },
              '& .MuiInputBase-input': {
                color: "#fff",  // Input text color
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            borderRadius: "20px",
            color: "#bb0000",
            '&:hover': {
              backgroundColor: alpha("#bb0000", 0.1),
            },
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          disabled={!caption || (!isTextPost && !photo)}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#008ABB", 
            color: "#fff",
            '&:hover': {
              backgroundColor: "#006C8A", // Button hover effect
            },
          }}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SocialMediaPostUpload;