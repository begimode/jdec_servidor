const jwt = require("jsonwebtoken")
require("dotenv").config();
const tokenSign = async (correo) => {
    return jwt.sign(
        {
            correo: correo
        },
        "" + process.env.JWT_KEY,
        {
            expiresIn: "1m",
        }
    )
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return null
    }
}

module.exports = {tokenSign,verifyToken}