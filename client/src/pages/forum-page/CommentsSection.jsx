import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { text: newComment, likes: 0, replies: [] }]);
            setNewComment("");
        }
    };

    const handleLikeComment = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].likes++;
        setComments(updatedComments);
    };

    const handleReply = (index, replyText) => {
        const updatedComments = [...comments];
        if (replyText.trim()) {
            updatedComments[index].replies.push({ text: replyText, likes: 0 });
            setComments(updatedComments);
        }
    };

    const handleLikeReply = (commentIndex, replyIndex) => {
        const updatedComments = [...comments];
        updatedComments[commentIndex].replies[replyIndex].likes++;
        setComments(updatedComments);
    };

    return (
        <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" gutterBottom>
                Comments
            </Typography>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
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
                <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="body1">{comment.text}</Typography>
                        <Box display="flex" gap={1} mt={1}>
                            <IconButton onClick={() => handleLikeComment(index)}>
                                <ThumbUpAltOutlinedIcon />
                                <Typography variant="caption" sx={{ ml: 0.5 }}>
                                    {comment.likes}
                                </Typography>
                            </IconButton>
                            <ReplySection
                                commentIndex={index}
                                replies={comment.replies}
                                handleReply={handleReply}
                                handleLikeReply={handleLikeReply}
                            />
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

const ReplySection = ({ commentIndex, replies, handleReply, handleLikeReply }) => {
    const [newReply, setNewReply] = useState("");

    return (
        <Box sx={{ ml: 4 }}>
            <Box display="flex" gap={2} mt={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write a reply..."
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        handleReply(commentIndex, newReply);
                        setNewReply("");
                    }}
                >
                    Reply
                </Button>
            </Box>
            {replies.map((reply, replyIndex) => (
                <Card key={replyIndex} sx={{ mt: 2, backgroundColor: '#eeeeee' }}>
                    <CardContent>
                        <Typography variant="body2">{reply.text}</Typography>
                        <Box display="flex" gap={1} mt={1}>
                            <IconButton onClick={() => handleLikeReply(commentIndex, replyIndex)}>
                                <ThumbUpAltOutlinedIcon />
                                <Typography variant="caption" sx={{ ml: 0.5 }}>
                                    {reply.likes}
                                </Typography>
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default CommentsSection;
