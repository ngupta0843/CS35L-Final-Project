const Posts = require("../../models/postModel.js");

const likePost = async(req, res) => {
    try{
        const { postId } = req.body;
        if (!postId) { 
            return res.status(400).json({ error: "Bad Post ID." });
        }

        const updatedPost = await Posts.findByIdAndUpdate(
            postId,
            { $inc: { likesCount: 1 } },
            { new: true }
        )
        
        if (!updatedPost) { 
            return res.status(404).json({ error: "Post not found." });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ error: "Internal server error." });
    }
    
};

module.exports = {likePost};