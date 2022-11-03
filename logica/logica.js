// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
var express = require("express")
const router = express.Router()
var nodemailer = require("nodemailer")
const jwt = require("../logica/generateToken")
const encrypt = require("../logica/encrypt")
require("dotenv").config();


require("dotenv").config()

// .....................................................................
// .....................................................................
module.exports = class Logica {
	// .................................................................
	// nombreBD: Texto
	// -->
	// constructor () -->
	// .................................................................
	constructor(nombreBD, cb) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			(err) => {
				if (!err) {
					this.laConexion.run("PRAGMA foreign_keys = ON")
				}
				cb(err)
			})
	} // ()

	//---------------------------------------

	// .................................................................
	// nombreTabla:Texto, id: R
	// -->
	// borrarFilasConID() -->
	// .................................................................
	borrarFilasConID(tabla, id) {
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(
				"delete from " + tabla + " where id = " + id + ";",
				(err) => (err ? rechazar(err) : resolver())
			)
		})
	} // ()

	/*
	// .................................................................
	// borrarFilasDeTodasLasTablas() -->
	// .................................................................
	async borrarFilasDeTodasLasTablas() {
		await this.borrarFilasDe("medicion")
	} // ()
	*/


	// .................................................................
	// datos:{id: null, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// -->
	// insertarMedicion() -->
	// .................................................................

	insertarMedicion(datos) {
		var textoSQL =
			"insert into medicion values($id, $valor, $fecha, $nombreSensor, $longitud, $latitud);"
		var valoresParaSQL = {
			$id: datos.id,
			$valor: datos.valor,
			$fecha: datos.fecha,
			$nombreSensor: datos.nombreSensor,
			$longitud: datos.longitud,
			$latitud: datos.latitud
		}
		console.log(datos.valor);
		console.log(datos.fecha);
		console.log(datos.nombreSensor);
		console.log(datos.longitud);
		console.log(datos.latitud);
		console.log("");

		// <//> <//> <//> <>/
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()



	// .................................................................
	// id: R
	// -->
	// buscarMedicionConID() <--
	// <--
	// {id: R, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// .................................................................

	buscarMedicionConID(id) {
		var textoSQL = "select * from medicion where id=$id";  //$id es un parámetro 
		var valoresParaSQL = { $id: id } // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}
	// ()

	// .................................................................
	// mostrarTodasMediciones() <--
	// <--
	// {id: R, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// .................................................................
	mostrarTodasMediciones() {
		var textoSQL = "SELECT * FROM medicion";  //$id es un parámetro 
		var valoresParaSQL = {} // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
					//console.log(res);
				})
		})
	}

	// .................................................................
	// datos:{correo: Texto, contrasenya: Texto, telefono: int, nombre: Texto, apellidos: Texto}
	// -->
	// insertarUsuario() -->
	// .................................................................

	async insertarUsuario(datos) {

		//Encriptamos la contraseña
		var hashPassword = await encrypt.encrypt(datos.contrasenya)
		console.log("Contraseña " + hashPassword);

		var textoSQL =
			"insert into usuario values($correo, $contrasenya, $telefono, $nombre, $apellidos, $estado);"
		var valoresParaSQL = {
			$correo: datos.correo,
			$contrasenya: hashPassword,
			$telefono: datos.telefono,
			$nombre: datos.nombre,
			$apellidos: datos.apellidos,
			$estado: datos.estado,
		}
		console.log(datos.usuario);
		//console.log(datos.contrasenya);
		console.log(datos.telefono);
		console.log(datos.nombre);
		console.log(datos.apellidos);
		console.log(datos.estado);
		console.log("");

		this.enviarCorreo()

		// <//> <//> <//> <>/
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()

	// .................................................................
	// correo: Texto
	// -->
	// buscarUsuario() <--
	// <--
	// {correo: Texto, contrasenya: Texto, telefono: int, nombre: Texto, apellidos: Texto}
	// .................................................................

	buscarUsuario(correo) {
		var textoSQL = "select * from usuario where correo=$correo";  //$id es un parámetro 
		var valoresParaSQL = { $correo: correo } // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}
	// ()

	//------------------
	enviarCorreo() {
		var transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: "fredrick47@ethereal.email", // generated ethereal user
				pass: "6pYGRf7GsHrK2NjFvq", // generated ethereal password
			}
		})

		var mailOptions = {
			from: "bernita.lueilwitz62@ethereal.email",
			to: "claire.carroll78@ethereal.email",
			subject: "hola que dices",
			text: "hola que dices"
		}

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.status(500).send(error.message);
			} else {
				console.log("Email enviado");
				res.status(200).json(req.body)
			}
		})
	}
	//---------------------------------------

	//Token
	async generateToken(correo) {
		console.log("logica1 " + correo);
		const tokenSession = await jwt.tokenSign(correo)
		console.log("logica2 " + tokenSession);

		return new Promise((resolver, rechazar) => {
			resolver(tokenSession)
		})
	}

	async verifyTokenAuth(datos) {
		const token = rew.headers.authorization.split("").pop()
		const tokenData = await jwt.verifyToken(datos)
		console.log("logica2 " + tokenData);

		if (tokenData.correo) {
			window.location.href = "index.html"
		} else {
			res.status(409)
			res.send({ error: "Tu por aquí no pasas" })
		}
	}

	//Desencriptar Contraseña

	async desencriptar(datos) {
		const checkPassword = await encrypt.compare(datos.cont, datos.hash)

		return new Promise((resolver, rechazar) => {
			resolver(checkPassword)
		})
	}

	cambiarDatosPersonales(datos) {
		var textoSQL = "update usuario set nombre=$nombre, apellidos=$apellidos, telefono=$telefono, correo=$correo where correo=$correoActual";  //$id es un parámetro 
		var valoresParaSQL = {
			$correoActual: datos.correoActual,
			$correo: datos.correo,
			$telefono: datos.telefono,
			$nombre: datos.nombre,
			$apellidos: datos.apellidos,
		} // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}

	// .................................................................
	// cerrar() -->
	// .................................................................

	cerrar() {
		return new Promise((resolver, rechazar) => {
			this.laConexion.close((err) => {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()

}
// class
// .....................................................................
// .....................................................................
