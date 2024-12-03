import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [hideComments, setHideComments] = useState(false);

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { text: newComment, likes: 0, replies: [], hideReplies: false }]);
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

    const toggleHideReplies = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].hideReplies = !updatedComments[index].hideReplies;
        setComments(updatedComments);
    };

    const toggleHideComments = () => {
        setHideComments(!hideComments);
    };

    return (
        <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: '#121212', color: '#ffffff' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Comments</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={toggleHideComments}
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
                            sx={{ input: { color: '#ffffff' }, backgroundColor: '#333333', borderRadius: 1 }}
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
                        <Card key={index} sx={{ mb: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                            <CardContent>
                                <Typography variant="body1">{comment.text}</Typography>
                                <Box display="flex" gap={1} mt={1} alignItems="center">
                                    <IconButton onClick={() => handleLikeComment(index)} sx={{ color: '#ffffff' }}>
                                        <ThumbUpAltOutlinedIcon />
                                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                                            {comment.likes}
                                        </Typography>
                                    </IconButton>
                                    <Button
                                        size="small"
                                        variant="text"
                                        onClick={() => toggleHideReplies(index)}
                                        sx={{ color: '#ffffff' }}
                                        startIcon={comment.hideReplies ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    >
                                        {comment.hideReplies ? "Show Replies" : "Hide Replies"}
                                    </Button>
                                </Box>
                                {!comment.hideReplies && (
                                    <ReplySection
                                        commentIndex={index}
                                        replies={comment.replies}
                                        handleReply={handleReply}
                                        handleLikeReply={handleLikeReply}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
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
                    sx={{ input: { color: '#ffffff' }, backgroundColor: '#333333', borderRadius: 1 }}
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
                <Card key={replyIndex} sx={{ mt: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                    <CardContent>
                        <Typography variant="body2">{reply.text}</Typography>
                        <Box display="flex" gap={1} mt={1}>
                            <IconButton onClick={() => handleLikeReply(commentIndex, replyIndex)} sx={{ color: '#ffffff' }}>
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
