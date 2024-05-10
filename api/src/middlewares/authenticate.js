const { verifyToken } = require('../utils/auth.js');

function authenticate(req, res, next){
    const token = req.headers.authorization || "";
    const accesstoken = token?.split(" ")[1] || "";
    if(!accesstoken){
        return res.status(401).json({message: "Somthing wrong with access token"});
    }
    try {
        const decoded = verifyToken(accesstoken)
        if(!decoded){
            return res.status(401).json({ message: "Unathorized access."})
        }
        console.log(decoded);
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = authenticate