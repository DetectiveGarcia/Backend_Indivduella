const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Enter your comment"],
        maxlength: [500, "Comment too long"],

    },
    author: {
        type: String,
        default: "Anonymous"
    }
    // ,
    // post: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post'
    // }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter the title of your post."],
        maxlength: [50, "Title too big"],
        minlength: [1, "Title too short"]
    },
    textContent: {
        type: String, 
        required: [true, "Enter the content of your post."],
        minlength: 1, 
        maxlength: 2500
    }
    ,
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }

    comments: [commentSchema]

}, { timestamps: true })

postSchema.pre('save', async function(next) {
    const post = this;
    if(post.isModified || post.isNew){
        const badWords = ["fan", "helvete", "jävla", "skit", "kuk", "fuck", "fucking"];
        let contentWords = post.textContent.split(" ");
        contentWords = contentWords.map((word) => {
            if(badWords.includes(word.toLowerCase())){
                console.log("Banned word detected", word);
                return "****"
            }
            return word
        });
        post.textContent = contentWords.join(" ");
    }
    return next();
})

commentSchema.pre('save', async function(next) {
    const comment = this;
    if(comment.isModified || comment.isNew){
        const badWords = ["fan", "helvete", "jävla", "skit", "kuk", "fuck", "fucking"];
        let contentWords = comment.text.split(" ");
        contentWords = contentWords.map((word) => {
            if(badWords.includes(word.toLowerCase())){
                console.log("Banned word detected:", word);
                return "****"
            }
            return word
        });
        comment.text = contentWords.join(" ");
    }
    return next();
})

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Post,
    Comment
}
