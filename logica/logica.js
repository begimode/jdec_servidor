// -------------------------------------------------------------------
// Archivo: logica.js
// J.Dec
// Descripcion: En este archivo se encuentran las funciones de la logica que llamarán a las funciones del servidor
// -------------------------------------------------------------------

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
	//
	// Este constructor se conecta a la base de datos
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
	//
	// Descripción: Se le pasa una id y una tabla para borrar los datos.
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
	// datos:{id: null, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R, ID_placa: R}
	// -->
	// insertarMedicion() -->
	//
	// Descripción: Se le pasa un objeto con los datos mencionados anteriormente y se hace una sentencia sql para insertar los datos de la medición en la bd
	// .................................................................

	insertarMedicion(datos) {
		var textoSQL =
			"insert into medicion values($ID_medida, $valor, $fecha, $tipoMedida, $longitud, $latitud, $ID_placa);"
		var valoresParaSQL = {
			$ID_medida: datos.id,
			$valor: datos.valor,
			$fecha: datos.fecha,
			$tipoMedida: datos.nombreSensor,
			$longitud: datos.longitud,
			$latitud: datos.latitud,
			$ID_placa: datos.ID_placa
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
	// datos:{id: null, motivo: Texto, mensaje: Texto, fecha: Texto, ID_user: R, ID_placa: R,}
	// -->
	// insertarNotificacion() -->
	//
	// Descripción: Se le pasa un objeto con los datos mencionados anteriormente y se hace una sentencia sql para insertar los datos de notificación en la bd
	// .................................................................

	insertarNotificacion(datos) {
		var textoSQL =
			"insert into notificacion values($ID_notificacion, $motivo, $mensaje, $fecha, $ID_user, $ID_placa);"
		var valoresParaSQL = {
			$ID_notificacion: datos.id,
			$motivo: datos.motivo,
			$mensaje: datos.mensaje,
			$fecha: datos.fecha,
			$ID_user: datos.ID_user,
			$ID_placa: datos.ID_placa,
		}
		console.log(datos.id);
		console.log(datos.motivo);
		console.log(datos.mensaje);
		console.log(datos.fecha);
		console.log(datos.ID_user);
		console.log(datos.ID_placa);

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
	// buscarNotificacion() -->
	// {id: null, motivo: Texto, mensaje: Texto, fecha: Texto, ID_user: R, ID_placa: R,}
	//
	// Descripción: Mediante una id que se le pasa se busca una sentencia sql para que te devuelva todos los datos de notificación de esa id
	// .................................................................

	buscarNotificacion(id) {
		var textoSQL = "select * from notificacion where ID_user=$ID_user";  //$id es un parámetro 
		var valoresParaSQL = { $ID_user: id } // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}

	// .................................................................
	// id: R
	// -->
	// buscarMedicionConID() <--
	// <--
	// {ID_user: R, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// 	
	// Descripción: Mediante una id que se le pasa se busca una sentencia sql para que te devuelva todos los datos de Medición de esa id
	// .................................................................

	buscarMedicionConID(id) {
		console.log("buscarMedicionConId");
		var textoSQL = "select * from medicion where ID_placa=$id";  //$id es un parámetro
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
	// 
	// Descripción: Se busca una sentencia sql para que te devuelva todos los datos de Medición
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
	// datos:{ID_user: null, correo: Texto, contrasenya: Texto, telefono: int, nombre: Texto, apellidos: Texto}
	// -->
	// insertarUsuario() -->
	// 
	// Descripción: Se le pasa un objeto con los datos mencionados anteriormente y se hace una sentencia sql para insertar los datos del usuario en la bd
	// .................................................................

	async insertarUsuario(datos) {
		//Encriptamos la contraseña
		var hashPassword = await encrypt.encrypt(datos.contrasenya)
		//console.log("Contraseña " + hashPassword);

		var textoSQL =
			"insert into usuario values($correo, $contrasenya, $telefono, $nombre, $apellidos, $estado, $ID_user);"
		var valoresParaSQL = {
			$ID_user: datos.ID_user,
			$correo: datos.correo,
			$contrasenya: hashPassword,
			$telefono: datos.telefono,
			$nombre: datos.nombre,
			$apellidos: datos.apellidos,
			$estado: datos.estado,
		}
		//console.log(datos.usuario);
		//console.log(datos.contrasenya);
		//console.log(datos.telefono);
		//console.log(datos.nombre);
		//console.log(datos.apellidos);
		//console.log(datos.estado);
		console.log("");

		//this.enviarCorreo()

		// <//> <//> <//> <>/
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()

	// .................................................................
	// datos:{id: null, ID_user: R, uuid: Texto, estadoPlaca: R}
	// -->
	// insertarPlaca() -->
	//
	// Descripción: Se le pasa un objeto con los datos mencionados anteriormente y se hace una sentencia sql para insertar los datos de la placa en la bd
	// .................................................................

	async insertarPlaca(datos) {
		var textoSQL =
			"insert into placa values($ID_placa, $ID_user, $uuid, $estadoPlaca);"
		var valoresParaSQL = {
			$ID_placa: datos.ID_placa,
			$ID_user: datos.ID_user,
			$uuid: datos.uuid,
			$estadoPlaca: datos.estadoPlaca,
		}
		console.log(datos.ID_placa);
		//console.log(datos.contrasenya);
		console.log(datos.ID_user);
		console.log(datos.uuid);
		console.log(datos.estadoPlaca);
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
	// buscarPlacaConID() <--
	// <--
	// {id: R, valor: R, fehca: Texto, nombreSensor: Texto, longitud: R, latitud: R}
	// 	
	// Descripción: Mediante una id que se le pasa se busca una sentencia sql para que te devuelva todos los datos de la Placa de esa id
	// .................................................................
	buscarPlacaConId(ID_user) {
		console.log("buscarPlacaConId");
		var textoSQL = "select * from placa where ID_user=$ID_user";  //$id es un parámetro 
		var valoresParaSQL = { $ID_user: ID_user } // objeto 
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL, valoresParaSQL,
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}
	// ()


	// .................................................................
	// correo: Texto
	// -->
	// buscarUsuario() <--
	// <--
	// {correo: Texto, contrasenya: Texto, telefono: int, nombre: Texto, apellidos: Texto}
	//
	// Descripción: Mediante un correo que se le pasa se busca una sentencia sql para que te devuelva todos los datos de usuario de ese correo
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


	// .................................................................
	// enviarCorreo() 
	//
	// Descripción: Se usa la librería nodemailer para que te envíe un correo, configuras el correo desde que se envía y la dirreción del destinatario, además del mensaje y el motivo.
	// .................................................................
	
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
	

	// .................................................................
	// correo: Texto 
	// -->
	// generateToken() -->
	// Token: Texto
	//
	// Descripción: Se usa la librería jwt a la cual le pasas el correo y te crea un token en función a ese correo y una clave secreta para que sea único para cada usuario.
	// .................................................................

	async generateToken(correo) {
		console.log("logica1 " + correo);
		const tokenSession = await jwt.tokenSign(correo)
		console.log("logica2 " + tokenSession);

		return new Promise((resolver, rechazar) => {
			resolver(tokenSession)
		})
	}

	// .................................................................
	// datos: Texto 
	// -->
	// verifyTokenAuth() -->
	//
	// Descripción: Se usa la librería jwt a la cual le pasas el correo y te crea un token en función a ese correo y una clave secreta para que sea único para cada usuario.
	// .................................................................

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

	// .................................................................
	// datos: {hash: Texto, cont: Texto} 
	// -->
	// desencriptar() -->
	// T/F
	//
	// Descripción: Se usa la librería encrypt, se pasa la contraseña cifrada y sin cifrar y con la librería se comparan, si es correcto devuelve un true
	// .................................................................

	async desencriptar(datos) {
		const checkPassword = await encrypt.compare(datos.cont, datos.hash)

		return new Promise((resolver, rechazar) => {
			resolver(checkPassword)
		})
	}

	// .................................................................
	// datos: {ID_user: R, correo: Texto, nombre: Texto, apellidos: Texto, telefono: R, contrasenya: Texto} 
	// -->
	// cambiarDatosPersonales() -->
	// T/F
	//
	// Descripción: Se le pasa un objeto con los datos mencionados anteriormente, se hace una petición sql para hacer update a los datos con la id_user específica y se modifica la base de datos
	// .................................................................


	async cambiarDatosPersonales(datos) {

		//Encriptamos la contraseña
		var hashPassword = await encrypt.encrypt(datos.contrasenya)
		console.log("Contraseña " + hashPassword);

		var textoSQL = "update usuario set nombre=$nombre, apellidos=$apellidos, telefono=$telefono, correo=$correo, contrasenya=$contrasenya where ID_user=$ID_user";  //$id es un parámetro 
		var valoresParaSQL = {
			$ID_user: datos.ID_user,
			$correo: datos.correo,
			$telefono: datos.telefono,
			$nombre: datos.nombre,
			$apellidos: datos.apellidos,
			$contrasenya: hashPassword,
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
