const { Comment, Post } = require('../models/post.model.js')

async function createComment(req, res){
    try {
        const {author, text, postId } = req.body;
        // const post = await Post.findById(postId)
        const comment = await Comment.create({text, author})
        return res.status(200).json({comment})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

async function createCommentToPost(req, res){
    const { id } = req.params
    const { text, author } = req.body
    try {
        const post = await Post.findById(id)
        post.comments.push({text, author});
        const commentedPost = await post.save();
        return res.status(200).json({commentedPost})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

async function deleteComment(req, res){
    const { id } = req.params
    try {
        // Find the post containing the comment
        const post = await Post.findOne({ "comments._id": id });
        if (!post) {
            return res.status(404).json({message: "Comment not found"});
        }
        // Remove the comment from the post's comments array
        post.comments.pull(id);
        await post.save();

        // Delete the comment document
        await Comment.findByIdAndDelete(id);
        res.status(200).json({message: "Comment succefully deleted"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({messge: "Internal server error"})
    }
}

module.exports = {
    createComment, 
    createCommentToPost,
    deleteComment
}