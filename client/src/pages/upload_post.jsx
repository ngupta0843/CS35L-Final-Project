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
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";

const SocialMediaPostUpload = ({ open, onClose }) => {
  const [isTextPost, setIsTextPost] = useState(false);
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [postContent, setPostContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const user = useSelector((state) => state.user);

  const handleSwitchChange = () => {
    setIsTextPost(!isTextPost);
    setPostContent("");
    setCaption("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try{
    const responseUserSchema = await axios.get("http://localhost:8088/users/currentUser?id=" + user.email);
    const userSchema = responseUserSchema.data;
    const postID = user.email + userSchema.profile_photo.length;
    //postID, postText, postImage, postAuthor, postCaption, postisText, postWorkoutTitle
    const response = await axios.post("http://localhost:8088/posts/createPost?postID=" + postID + "&postAuthor=" + user.email + "&postCaption=" + caption + "&postisText=" + isTextPost + "&postWorkoutTitle=" + workoutTitle, {image:(isTextPost ? null : photo)});
    onClose();
    } catch(error){
      console.error("Error creating post:", error);
    }
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
      <DialogTitle sx={{ color: "#fff" }}>
        Create a Social Media Post
      </DialogTitle>
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
                  "&.Mui-checked": {
                    color: "#008ABB",
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

        {!isTextPost && (
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Upload a Photo
            </Typography>
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
                  mt: 1,
                  borderRadius: 3,
                  background:
                    "linear-gradient(45deg, #1E88E5 30%, #1DE9B6 90%)",

                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #1976D2 30%, #4FC3F7 90%)",
                    opacity: 0.9,
                  },
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

        {isTextPost && (
          <Box sx={{ my: 3 }}>
            {" "}
            {/* Increased spacing to distinguish from other elements */}
            {/* <TextField
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
            /> */}
          </Box>
        )}

        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Workout Title (Optional)"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            // sx={{
            //   backgroundColor: "#333",
            //   '& .MuiOutlinedInput-root': {
            //     backgroundColor: "#333",
            //     '&:hover fieldset': {
            //       borderColor: "#008ABB",
            //     },
            //   },
            //   '& .MuiInputLabel-root': {
            //     color: "#fff",
            //   },
            //   '& .MuiInputBase-input': {
            //     color: "#fff",
            //   },
            // }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                  border: "2px solid transparent",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(45deg, #6200ee 30%, #9c27b0 90%)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid transparent",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(45deg, #6200ee 30%, #9c27b0 90%)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid transparent",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(45deg, #6200ee 30%, #9c27b0 90%)",
                },

                "& .MuiOutlinedInput-inputMultiline": {
                  color: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
        </Box>

        <Box sx={{ my: 3 }}>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            label="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            // sx={{
            //   backgroundColor: "#333",
            //   "& .MuiOutlinedInput-root": {
            //     backgroundColor: "#333",
            //     "&:hover fieldset": {
            //       borderColor: "#008ABB",
            //     },
            //   },
            //   "& .MuiInputLabel-root": {
            //     color: "#fff",
            //   },
            //   "& .MuiInputBase-input": {
            //     color: "#fff",
            //   },
            // }}
            inputProps={{ style: { color: "white" } }}
            sx={{
              color: "white",
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                  border: "2px solid transparent",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(45deg, #6200ee 30%, #9c27b0 90%)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid transparent",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(45deg, #6200ee 30%, #9c27b0 90%)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid transparent",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(45deg, #6200ee 30%, #9c27b0 90%)",
                },

                "& .MuiOutlinedInput-inputMultiline": {
                  color: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
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
            "&:hover": {
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
            cursor: "pointer",
            borderRadius: "20px",
            backgroundColor: "#008ABB",
            color: "white",
            "&:hover": {
              backgroundColor: "#006C8A",
              color: "white",
            },
            "&.Mui-disabled": {
              color: "white",
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
