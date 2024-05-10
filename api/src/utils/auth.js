const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = process.env.JWT_ACCESS_SECRET;
const refreshKey = process.env.JWT_REFRESH_SECRET;

function generateToken(userID) {
  return jwt.sign({ userID }, secretKey, { expiresIn: "5m" });
}

function refreshToken(token) {
    return jwt.sign({token}, refreshKey, { expiresIn: "7d" })
}

function verifyToken(token){
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        console.log(error.name);
    }
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
}

module.exports = {
  generateToken,
  refreshToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
