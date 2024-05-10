const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter your user name."],
        unique: true,
        minlength: 1,
        maxlenght: [10, "User name too big."]
    }, 
    email: {
        type: String,
        required: [true, "Enter your email."],
        unique: true,
        minlength: 4, 
        lowercase: [true, "No capital letters"],
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.post('save', function(doc, next){
    console.log("user.model.js: New user created", doc);
    next();
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User 