// -------------------------------------------------------------------
// Archivo: generarToken.js
// J.Dec
// Descripcion: Este archivo crea un token para crear la sesion de cada usuario
// -------------------------------------------------------------------

const jwt = require("jsonwebtoken")
require("dotenv").config();

// .................................................................
// correo
// -->
//  Async AnonymousFunction() <--
// <--
// token.sign
//
// Esta funcion crea el token con el correo y una clave secreta (.env)
// .................................................................
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


// .................................................................
// token
// -->
//  Async AnonymousFunction() <--
// <--
// hash
//
// Esta funcion verifica el token 
// .................................................................
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return null
    }
}


module.exports = {tokenSign,verifyToken}