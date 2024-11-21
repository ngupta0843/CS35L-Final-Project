import React, { useState } from 'react';
import { Icon, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
                    <IconButton onClick={handleLike} sx={{color : liked ? 'red' : 'white' }} >
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Comment">
                    <IconButton color="default" sx={{color : 'white'}}>
                        <CommentIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}
export default PostActions;