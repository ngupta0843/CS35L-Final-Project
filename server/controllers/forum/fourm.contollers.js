const Users = require("../../models/userModel.js");
const { v4: uuidv4 } = require('uuid');

const generateUniquePostID = async () => {
  let uniqueId;
  let exists = true;

  while (exists) {
    uniqueId = uuidv4();
    exists = await Post.findOne({ postID: uniqueId });
  }

  return uniqueId;
};

const createPost = async (req, res) => {
    const { uId, pTitle, pMessage, pParent } = req.body;
    console.log(req.body);
    try {
        const user = await Users.findOne({ id: uId});
        if(!user){
            return res.status(404).json({message: "User can not be found."});
        }

        const newPost = new Post({
            name: user.name,
            userId: user.id,
            postId: generateUniquePostID(),
            // profile_photo: user.profile_photo,
            title: pTitle,
            message: pMessage,
            thread: [],
            parentID: pParent,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const savePost = await newPost.save();

        if(!user.posts){
            user.posts=[]
        }
        if(!user.posts.includes(savePost.postID)){
            user.posts.push(savePost.postID)
        }

        await user.save();

        return res.status(201).json({ 
            message: "Post created successfully", 
        });

    } 
    catch (error) {
        res.status(500).json({message: "Something went wrong creating your post."});
    }
};


const deletePost = async (req, res) => {
     const { postId } = req.body

     const post = await Post.findOne({ postId });

     if(!post){
        res.status(404).json({message: "Post could not be found"});
     }

     post.name = "";
     post.profile_photo = "";

    // Should users still be able to see their old posts even if their info does not appear?
    // const user = await Users.findOne({ id: uId});
    // if(!user){
    //     return res.status(404).json({message: "User can not be found."});
    // }
    // if (user.posts.includes(postId)) {
    //     user.posts = user.posts.filter((postId) => post !== postId);
    //     await user.save();  // Save the updated user
    // }
};

const updatePost = async(req, res) => {
    try {
        const { postId, pUser, pMessage, pTitle } = req.body

        const post = await Post.findOne({ postId });
        // post couldn't be found by postId
        if(!post){
            res.status(404).json({message: "Post could not be found."});
        }

        // bad user
        if(post.userId != pUser){
            res.status(403).json({message: "Edit access to post denied."});
            return;
        }

        //update post
        post.message = pMessage;
        post.title = pTitle;
        await post.save();

        // if successful
        return res.status(200).json({message: "Post updated successfully." });

    }
    catch (error) {
        // catch unexpected errors
        console.error(error);  // log error for debugging
        return res.status(500).json({ message: "Something went wrong while updating the post :(" });
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost
}