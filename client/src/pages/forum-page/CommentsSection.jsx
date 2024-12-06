// import React, { useState } from 'react';
// import { TextField, Button, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

// const CommentsSection = () => {
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState("");
//     const [hideComments, setHideComments] = useState(false);

//     const handleAddComment = () => {
//         if (newComment.trim()) {
//             setComments([...comments, { text: newComment, likes: 0, replies: [], hideReplies: false }]);
//             setNewComment("");
//         }
//     };

//     const handleLikeComment = (index) => {
//         const updatedComments = [...comments];
//         updatedComments[index].likes++;
//         setComments(updatedComments);
//     };

//     const handleReply = (index, replyText) => {
//         const updatedComments = [...comments];
//         if (replyText.trim()) {
//             updatedComments[index].replies.push({ text: replyText, likes: 0 });
//             setComments(updatedComments);
//         }
//     };

//     const handleLikeReply = (commentIndex, replyIndex) => {
//         const updatedComments = [...comments];
//         updatedComments[commentIndex].replies[replyIndex].likes++;
//         setComments(updatedComments);
//     };

//     const toggleHideReplies = (index) => {
//         const updatedComments = [...comments];
//         updatedComments[index].hideReplies = !updatedComments[index].hideReplies;
//         setComments(updatedComments);
//     };

//     const toggleHideComments = () => {
//         setHideComments(!hideComments);
//     };

//     return (
//         <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: '#121212', color: '#ffffff' }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h5">Comments</Typography>
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={toggleHideComments}
//                     startIcon={hideComments ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
//                 >
//                     {hideComments ? "Show Comments" : "Hide Comments"}
//                 </Button>
//             </Box>
//             {!hideComments && (
//                 <>
//                     <Box display="flex" gap={2} mb={2}>
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             value={newComment}
//                             onChange={(e) => setNewComment(e.target.value)}
//                             placeholder="Write a comment..."
//                             sx={{ input: { color: '#ffffff' }, backgroundColor: '#333333', borderRadius: 1 }}
//                         />
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleAddComment}
//                             startIcon={<AddCommentOutlinedIcon />}
//                         >
//                             Comment
//                         </Button>
//                     </Box>
//                     {comments.map((comment, index) => (
//                         <Card key={index} sx={{ mb: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//                             <CardContent>
//                                 <Typography variant="body1">{comment.text}</Typography>
//                                 <Box display="flex" gap={1} mt={1} alignItems="center">
//                                     <IconButton onClick={() => handleLikeComment(index)} sx={{ color: '#ffffff' }}>
//                                         <ThumbUpAltOutlinedIcon />
//                                         <Typography variant="caption" sx={{ ml: 0.5 }}>
//                                             {comment.likes}
//                                         </Typography>
//                                     </IconButton>
//                                     <Button
//                                         size="small"
//                                         variant="text"
//                                         onClick={() => toggleHideReplies(index)}
//                                         sx={{ color: '#ffffff' }}
//                                         startIcon={comment.hideReplies ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
//                                     >
//                                         {comment.hideReplies ? "Show Replies" : "Hide Replies"}
//                                     </Button>
//                                 </Box>
//                                 {!comment.hideReplies && (
//                                     <ReplySection
//                                         commentIndex={index}
//                                         replies={comment.replies}
//                                         handleReply={handleReply}
//                                         handleLikeReply={handleLikeReply}
//                                     />
//                                 )}
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </>
//             )}
//         </Box>
//     );
// };

// const ReplySection = ({ commentIndex, replies, handleReply, handleLikeReply }) => {
//     const [newReply, setNewReply] = useState("");

//     return (
//         <Box sx={{ ml: 4 }}>
//             <Box display="flex" gap={2} mt={2}>
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     value={newReply}
//                     onChange={(e) => setNewReply(e.target.value)}
//                     placeholder="Write a reply..."
//                     sx={{ input: { color: '#ffffff' }, backgroundColor: '#333333', borderRadius: 1 }}
//                 />
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => {
//                         handleReply(commentIndex, newReply);
//                         setNewReply("");
//                     }}
//                 >
//                     Reply
//                 </Button>
//             </Box>
//             {replies.map((reply, replyIndex) => (
//                 <Card key={replyIndex} sx={{ mt: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//                     <CardContent>
//                         <Typography variant="body2">{reply.text}</Typography>
//                         <Box display="flex" gap={1} mt={1}>
//                             <IconButton onClick={() => handleLikeReply(commentIndex, replyIndex)} sx={{ color: '#ffffff' }}>
//                                 <ThumbUpAltOutlinedIcon />
//                                 <Typography variant="caption" sx={{ ml: 0.5 }}>
//                                     {reply.likes}
//                                 </Typography>
//                             </IconButton>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             ))}
//         </Box>
//     );
// };

// export default CommentsSection;









import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';

// const CommentsSection = ({ postID, commentorEmail }) => {
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState("");
//     const [hideComments, setHideComments] = useState(false);

//     console.log(postID);

//     useEffect(() => {
//         handleGetComments();
//     }, []); 

//     const handleAddComment = async () => {
//         if (newComment.trim()) {
//             try {
//                 await axios.post("http://localhost:8088/comment/createComment", {
//                     userEmail: commentorEmail,
//                     commentMessage: newComment,
//                     parentPost: postID,
//                 });

//                 handleGetComments();

//                 setNewComment(""); // Clear the input field
//             } catch (error) {
//                 console.error("Error adding comment:", error.response?.data || error.message);
//             }
//         }
//     };

//     const handleGetComments = async () => {
//         try {
//             const response = await axios.post("http://localhost:8088/comment/getComments", {
//                 postID: postID,
//             });
//             console.log("Fetched comments:", response.data);

//             setComments(response.data.map(comment => ({
//                 text: comment.message,
//                 likes: comment.likes,
//                 username: comment.username,
//                 commentID: comment.commentID,
//                 replies: [],
//                 hideReplies: false,
//                 isEditing: false,
//             })));
//         } catch (error) {
//             console.error("Error fetching comments:", error.response?.data || error.message);
//         }
//     };

//     const toggleHideComments = () => {
//         setHideComments(!hideComments);
//     };

//     const handleLikeComment = async (index) => {
//         try {
//             const updatedComments = [...comments];
//             updatedComments[index].likes++;
//             setComments(updatedComments);
//             const newLikes  =  updatedComments[index].likes
//             const commentID = updatedComments[index].commentID
//             const response = await axios.post("http://localhost:8088/comment/likeComment", {
//                 commentID: commentID,
//                 likeCounter: newLikes,
//             });
//             console.log("Updated comment:", response.data);

//         } catch (error) {
//             console.log("Error updating comment likes");
//         }
//     };

// const handleEditComment = (index) => {
//     const updatedComments = [...comments];
//     updatedComments[index].isEditing = true; // Set the editing state for this comment
//     setComments(updatedComments);
//   };

//   const handleConfirmEdit = async (index) => {
//     const updatedComments = [...comments];
//     const updatedComment = updatedComments[index];
//     console.log("we out here gang");

//     try {
//       const response = await axios.post("http://localhost:8088/comment/editComment", {
//         commentID: updatedComment.commentID,
//         commentMessage: updatedComment.text,
//       });
//         updatedComments[index].isEditing = false;
//         setComments([...updatedComments]);
//     } catch (error) {
//         console.error("Error updating comment:", error.response?.data || error.message);
//     }
//   };

//   const handleChangeCommentText = (index, newText) => {
//     const updatedComments = [...comments];
//     updatedComments[index].text = newText; // Update the comment text locally
//     setComments(updatedComments);
//   };

//   return (
//     <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: "#121212", color: "#ffffff" }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5">Comments</Typography>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={toggleHideComments}
//           startIcon={
//             hideComments ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />
//           }
//         >
//           {hideComments ? "Show Comments" : "Hide Comments"}
//         </Button>
//       </Box>
//       {!hideComments && (
//         <>
//           <Box display="flex" gap={2} mb={2}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Write a comment..."
//               sx={{ input: { color: "#ffffff" }, backgroundColor: "#333333", borderRadius: 1 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddComment}
//               startIcon={<AddCommentOutlinedIcon />}
//             >
//               Comment
//             </Button>
//           </Box>
//           {comments.map((comment, index) => (
//             <Card key={comment.commentID} sx={{ mb: 2, backgroundColor: "#1e1e1e", color: "#ffffff" }}>
//               <CardContent>
//                 <Typography>
//                   <strong style={{ fontSize: "14px" }}>{comment.username}</strong>:
//                 </Typography>
//                 {comment.isEditing ? (
//                   <Box display="flex" gap={1} alignItems="center">
//                     <TextField
//                       value={comment.text}
//                       onChange={(e) => handleChangeCommentText(index, e.target.value)}
//                       fullWidth
//                       variant="outlined"
//                       sx={{ input: { color: "#ffffff" }, backgroundColor: "#333333" }}
//                     />
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleConfirmEdit(index)}
//                     >
//                       Confirm
//                     </Button>
//                   </Box>
//                 ) : (
//                   <Typography variant="body1">{comment.text}</Typography>
//                 )}
//                 <Box display="flex" gap={1} mt={1} alignItems="center">
//                   <IconButton onClick={() => handleLikeComment(index)} sx={{ color: "#ffffff" }}>
//                     <ThumbUpAltOutlinedIcon />
//                     <Typography variant="caption" sx={{ ml: 0.5 }}>
//                       {comment.likes}
//                     </Typography>
//                   </IconButton>
//                   {!comment.isEditing && (
//                     <IconButton onClick={() => handleEditComment(index)} sx={{ color: "#ffffff" }}>
//                       <EditOutlinedIcon />
//                     </IconButton>
//                   )}
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </>
//       )}
//     </Box>
//   );
// };

// export default CommentsSection;



const CommentsSection = ({ postID, commentorEmail }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    handleGetComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await axios.post("http://localhost:8088/comment/createComment", {
          userEmail: commentorEmail,
          commentMessage: newComment,
          parentPost: postID,
        });

        handleGetComments();
        setNewComment(""); // Clear the input field
      } catch (error) {
        console.error("Error adding comment:", error.response?.data || error.message);
      }
    }
  };

  const handleGetComments = async () => {
    try {
      const response = await axios.post("http://localhost:8088/comment/getComments", {
        postID: postID,
      });

      setComments(
        response.data.map((comment) => ({
          text: comment.message,
          likes: comment.likes,
          username: comment.username,
          commentID: comment.commentID,
          userEmail: comment.userEmail,
          replies: [],
          hideReplies: false,
          isEditing: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching comments:", error.response?.data || error.message);
    }
  };

  const handleLikeComment = async (index) => {
    try {
      const updatedComments = [...comments];
      updatedComments[index].likes++;
      setComments(updatedComments);

      const commentID = updatedComments[index].commentID;
      await axios.post("http://localhost:8088/comment/likeComment", {
        commentID: commentID,
        likeCounter: updatedComments[index].likes,
      });
    } catch (error) {
      console.log("Error updating comment likes");
    }
  };

  const handleEditComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].isEditing = true; // Enter editing mode
    setComments(updatedComments);
  };

  const handleConfirmEdit = async (index) => {
    const updatedComments = [...comments];
    const updatedComment = updatedComments[index];
    console.log("we out here gang");

    try {
      await axios.post("http://localhost:8088/comment/editComment", {
        commentID: updatedComment.commentID,
        commentMessage: updatedComment.text,
        commentUserEmail: commentorEmail, // Ensure this matches the backend expectation
      });

      updatedComments[index].isEditing = false; // Exit editing mode
        setComments([...updatedComments]); // Update state to trigger re-render
        handleGetComments();

    } catch (error) {
      console.error("Error updating comment:", error.response?.data || error.message);
    }
  };

  const handleChangeCommentText = (index, newText) => {
    const updatedComments = [...comments];
    updatedComments[index].text = newText; // Update the text locally
    setComments(updatedComments);
  };

    const handleDeleteComment = async (index) => {
    const commentID = comments[index].commentID;
    const commentUserEmail = comments[index].userEmail

    try {
        await axios.post("http://localhost:8088/comment/deleteComment", {
        commentID: commentID,
        commentUserEmail: commentUserEmail,
        });

        // Remove the comment from the frontend state
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
    } catch (error) {
        console.error("Error deleting comment:", error.response?.data || error.message);
    }
    };

  return (
    <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: "#121212", color: "#ffffff" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Comments</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setHideComments(!hideComments)}
          startIcon={hideComments ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
        >
          {hideComments ? "Show Comments" : "Hide Comments"}
        </Button>
      </Box>
      {!hideComments && (
        <>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              sx={{ input: { color: "#ffffff" }, backgroundColor: "#333333", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              startIcon={<AddCommentOutlinedIcon />}
            >
              Comment
            </Button>
          </Box>
          {comments.map((comment, index) => (
            <Card key={comment.commentID} sx={{ mb: 2, backgroundColor: "#1e1e1e", color: "#ffffff" }}>
              <CardContent>
                <Typography>
                  <strong style={{ fontSize: "14px" }}>{comment.username}</strong>
                </Typography>
                {comment.isEditing ? (
                  <Box display="flex" gap={1} alignItems="center">
                    {/* Editable TextField */}
                    <TextField
                      value={comment.text}
                      onChange={(e) => handleChangeCommentText(index, e.target.value)}
                      fullWidth
                      variant="outlined"
                      sx={{ input: { color: "#ffffff" }, backgroundColor: "#333333" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleConfirmEdit(index)}
                    >
                      Confirm
                    </Button>
                  </Box>
                ) : (
                  /* Static Display when not editing */
                  <Typography variant="body1">{comment.text}</Typography>
                )}
                <Box display="flex" gap={1} mt={1} alignItems="center">
                    {comment.userEmail !== commentorEmail && (
                        <IconButton onClick={() => handleLikeComment(index)} sx={{ color: "#ffffff" }}>
                            <ThumbUpAltOutlinedIcon />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {comment.likes}
                            </Typography>
                        </IconButton>
                    )}
                  
                  {/* {comment.userEmail === commentorEmail && !comment.isEditing && (
                    <IconButton onClick={() => handleEditComment(index)} sx={{ color: "#ffffff" }}>
                      <EditOutlinedIcon />
                    </IconButton>
                  )} */}
                  {comment.userEmail === commentorEmail && (
                    <IconButton onClick={() => handleDeleteComment(index)} sx={{ color: "#ffffff" }}>
                      <DeleteOutlinedIcon/>
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default CommentsSection;