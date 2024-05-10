const User = require('../models/user.model.js');
const { generateToken, refreshToken, hashPassword, comparePassword, verifyToken } = require('../utils/auth.js')

const register = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        const _user = await User.findOne({ email })
        if(_user){
            return res.status(409).json({message: 'User already exist'});
        }
        const user = await User.create({ username, email, password, isAdmin })
        
        res.status(200).json({ message: user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        console.log(password, user.password);
        console.log(user);
        if(!user || !(await comparePassword(password, user.password))){
            return res.status(401).json({message: "Unvalid email or password"})
        }
        const token = generateToken(user._id)
        res.status(200).json({ token, user })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error.'})
    }
}

const registerAdmin = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message: 'User already exist'});
        }
        const adminUser = await User.create({ username, email, password, isAdmin: true })

        res.status(200).json({ message: adminUser })
    } catch (error) {
        console.log(error);
    }
}

async function getOneUser(req, res){
    try {
        // const token = req.headers.authorization;
        // const { id } = req.params;
        const userId = req.user;
        const user = await User.findById(userId.userID);

        // const accessToken = token?.split(' ')[1] || "";
        // if(!accessToken){
        //     return res.status(401).json({message: "Unauthorized"})
        // }
        
        // const decoded = verifyToken(accessToken)
        // if(!token){
        //     return res.status(404).json({message: "Token not found"})
        // }
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        // res.status(200).json({user})
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    register,
    login,
    registerAdmin,
    getOneUser
}