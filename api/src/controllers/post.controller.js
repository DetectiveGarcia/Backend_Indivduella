const { Post } = require('../models/post.model.js');
const { refreshToken } = require('../utils/auth.js');

async function createPost(req, res){

    try{
        const { title, textContent } = req.body;
        const token = req.headers.authorization || "";
        const accessToken = token?.split(" ")[1] || "";
        const post = await Post.create({ title, textContent });
        
        res.status(200).json({ post, token })

    } catch(error){
        console.log('postController.js: ', error);
        res.status(500).json({ message: 'Internal server error' })
    }

}

async function allPosts(req, res){
    try{
        const posts = await Post.find({})
        // .populate("user");
        if(!posts){
            return res.status(404).json({ message: 'No post found' })
        }
        res.status(200).json({ posts })
    } catch(error){
        console.log('postController.js: ', error);
        res.status(500).json({ message: "Internal server rrror" })
    }
}

async function deletePost(req, res){
    const { id } = req.params;
    if(!id){
        return res.status(404).json({message: "Post not found"})
    };
    try {
        const deletedPost = await Post.findByIdAndDelete({ id });
        return res.status(204).json({ message: "Post succefully deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }

}

module.exports = {
    createPost, 
    allPosts,
    deletePost
}