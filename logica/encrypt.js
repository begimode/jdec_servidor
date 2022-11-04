// -------------------------------------------------------------------
// Archivo: encrypt.js
// J.Dec
// Descripcion: Este archivo encripta las contraseñas de los usuarios para su seguridad y privacidad
// -------------------------------------------------------------------

//Biblioteca para la encriptacion
const bcrypt = require("bcryptjs")


// .................................................................
// textPlain
// -->
//  Async AnonymousFunction() <--
// <--
// hash
//
// Esta funcion encripta la contraseña introducida por el usuario
// .................................................................
const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}


// .................................................................
// passwordPlain, hashPassword
// -->
//  Async AnonymousFunction() <--
// <--
// T/F
//
// Esta funcion se utiliza para confirmar la contraseña, comparando ambas encriptadas
// .................................................................
const compare = async(passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = {encrypt,compare}