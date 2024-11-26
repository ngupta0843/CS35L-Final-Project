import React, { useEffect, useState } from "react";
import { Icon, IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { useSelector } from "react-redux";

function PostActions({ username, caption, initialLikeCount }) {
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [postID, setPostID] = useState(null);

  useEffect(() => {
    fetchPostID();
  });

  const fetchPostID = async () => {
    try {
      console.log("fetching data request");
      const response = await axios.get(
        `http://localhost:8088/posts/getPost?username=${username}&caption=${caption}`
      );
      console.log("response: ", response.data);
      if (response.data.likedUsers.includes(user.email)) {
        setLiked(true);
      }
      setPostID(response.data._id);
    } catch (error) {
      console.error("Error fetching postID:", error);
    }
  };

  const handleLike = async () => {
    if (!postID) {
      console.error("PostID not found!");
      return;
    }

    try {
      console.log("liking posts request");
      await axios.post(`http://localhost:8088/posts/likePost`, {
        postId: postID,
        user: user.email,
      });
      setLikeCount((prev) => prev + 1);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Tooltip title="Like">
          <IconButton
            onClick={handleLike}
            sx={{ color: liked ? "red" : "white" }}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Comment">
          <IconButton color="default" sx={{ color: "white" }}>
            <CommentIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
export default PostActions;
