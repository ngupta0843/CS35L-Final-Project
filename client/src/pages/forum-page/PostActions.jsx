import React, { useState } from 'react';
import { Icon, IconButton, Tooltip } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

function PostActions() {
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
        setLiked(!liked);
    };

    return(
        <div style={{display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Tooltip title="Like">
                    <IconButton onClick={handleLike} color={liked ? 'primary' : 'default'}>
                        <ThumbUpIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Comment">
                    <IconButton color="default">
                        <CommentIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}
export default PostActions;