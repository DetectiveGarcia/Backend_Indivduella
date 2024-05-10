const User = require('../models/user.model.js');

async function createUser(req, res){
    try{

        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password })
        res.status(200).json({ message: user })
    } catch(error){
        console.log('user.route.js: ', error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

// async function getUser(req, res){
    
// }

module.exports = {
    createUser
} 