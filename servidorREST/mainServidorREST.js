// --------------------------------------------------------------------------------
// mainServidorREST.js
// --------------------------------------------------------------------------------

var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")
require("dotenv").config()


const fs = require('fs')

const Logica = require("../logica/logica.js")
const { log } = require('console')

// --------------------------------------------------------------------------------
// En vez de tener que instalar una regla para cada función de la lógica
// adopto el convenio (usando solamente GET) que la llamadas son
// 
//  ---------------------------
//  GET /nombreFuncionLogica
// 
//  datos en JSON en el cuerpo
//  ---------------------------
// 
//  de forma que con una regla sobra. Aunque esto "rompe" la filosofía REST.
// 
// --------------------------------------------------------------------------------
function cargarReglasUniversales(servidorExpress, laLogica) {

	// .......................................................
	// Reglas del API REST
	// .......................................................

	servidorExpress.post("/send-email", async function (peticion, respuesta) {
		console.log(" * POST /send-email")
		await laLogica.enviarCorreo()
		console.log("Hecho");
		respuesta.send("OK")
	})
	// () 

	
	// .......................................................
	// GET /medicion/<id>
	// .......................................................
	servidorExpress.get("/medicion/:id", async function (peticion, respuesta) {
		console.log(" * GET /medicion id ")
		// averiguo el id
		var id = peticion.params.id
		// llamo a la función adecuada de la lógica
		var res = await laLogica.buscarMedicionConID(id)
		console.log(res);
		// si el array de resultados no tiene una casilla ...
		if (res.length != 1) {
			// 404: not found
			respuesta.status(404).send("no encontré id: " + id)
			return
		}
		// todo ok
		respuesta.send(JSON.stringify(res[0]))
	}) // get /medicion id


	// .......................................................
	// GET /todasMediciones
	// .......................................................
	servidorExpress.get("/todasMediciones", async function (peticion, respuesta) {
		console.log(" * GET /todasMediciones ")
		// llamo a la función adecuada de la lógica
		var res = await laLogica.mostrarTodasMediciones()
		console.log(res);
		// si el array de resultados no tiene una casilla ...
		
		// todo ok
		respuesta.send(JSON.stringify(res))
	}) // get /medicion id


	// .......................................................
	// POST /insertarMedicion
	// .......................................................

	servidorExpress.post("/insertarMedicion", async function (peticion, respuesta) {
		console.log(" * POST /insertarMedicion")
		var datos = JSON.parse(peticion.body)
		//console.log(datos.id)
		console.log(datos.valor)
		console.log(datos.fecha)
		console.log(datos.nombreSensor)
		console.log(datos.longitud)
		console.log(datos.latitud)

		await laLogica.insertarMedicion(datos)
		console.log("Hecho");
		respuesta.send("OK")
	})
	// () 

	// .......................................................
	// POST /insertarUsuario
	// .......................................................

	servidorExpress.post("/insertarUsuario", async function (peticion, respuesta) {
		console.log(" * POST /insertarMedicion")
		var datos = JSON.parse(peticion.body)
		//console.log(datos.id)
		console.log(datos.correo)
		console.log(datos.telefono)
		console.log(datos.nombre)
		console.log(datos.apellidos)
		console.log(datos.estado)

		await laLogica.insertarUsuario(datos)
		console.log("Hecho");
		respuesta.send("OK")
	})
	// () 

	// .......................................................
	// GET /usuario/<correo>
	// .......................................................
	servidorExpress.get("/usuario/:correo", async function (peticion, respuesta) {
		console.log(" * GET /usuario correo ")
		// averiguo el id
		var correo = peticion.params.correo
		// llamo a la función adecuada de la lógica
		var res = await laLogica.buscarUsuario(correo)
		console.log(res);
		// si el array de resultados no tiene una casilla ...
		if (res.length != 1) {
			// 404: not found
			respuesta.status(404).send("no encontré id: " + id)
			return
		}
		// todo ok
		respuesta.send(JSON.stringify(res[0]))
	}) // get /medicion id

	// .......................................................
	// DELETE /insertarMedicion
	// .......................................................

	servidorExpress.delete("/borrarConID/:id", async function (peticion, respuesta) {
		console.log(" * DELETE /borrarConID/:id")
		// averiguo el id
		var id = peticion.params.id
		// llamo a la función adecuada de la lógica
		await laLogica.borrarFilasConID("medicion",id)
		console.log("Borrado");
		respuesta.send("OK")
	})
	// () 

	
	//Token
	servidorExpress.post("/auth/:correo", async function (peticion, res) {
		console.log(" * GET /auth ")
		var correo = peticion.params.correo

    	//Consultar bd y validar que existen
    	const user ={username:correo}

		const accessToken = laLogica.generateAccessToken(user)
		res.header("authorization", accessToken).json({
			message: "Usuario permitido",
			token: 32
		})
		//res.send(JSON.stringify(res[0]))

	}) // get /medicion id

	servidorExpress.get("/api", async function (peticion, res) {
		laLogica.validateToken()
		console.log("Esto es seguro");
		res.send(JSON.stringify(res[0]))

	}) // get /medicion id

	//Desencriptar
	servidorExpress.post("/desencriptar/:datos", async function (peticion, res) {
		console.log(" * POST /desencriptar ")
		var datos = JSON.parse(peticion.body)
		var res2 = await laLogica.desencriptar(datos)
		res.send(JSON.stringify(res2))

	}) // get /medicion id


} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
async function main() {

	var laLogica = null


	//  
	//  cargo logica abriendo conexión
	//  

	laLogica = new Logica("../bd/dbmedicion", function (err) {
		if (err) {
			throw new Error("No he podido conectar con datos.db")
		}
	})

	//  
	// creo el servidor
	//  
	var servidorExpress = express()
	servidorExpress.use(cors())
	//  
	// para poder acceder a la carga de la petición http
	// (asumiendo que es JSON) hay que hacer esto:
	//  
	// OK: original:
	servidorExpress.use(bodyParser.text({ type: 'application/json' }))

	// Me ha dado problemas: servidorExpress.use( express.json() )

	// no creo que necesite esto: servidorExpress.use(express.urlencoded({ extended: true }));

	//  
	// cargo las reglas REST
	//  
	cargarReglasUniversales(servidorExpress, laLogica)

	//  
	// configuradión automática para que sirva ficheros de ../ux
	//  
	servidorExpress.use(express.static("../ux"))

	//  
	// arranco el servidor
	//  
	var servicio = servidorExpress.listen(8080, function () {
		console.log("servidor REST escuchando en el puerto 8080: http://localhost:8080/Aplicacion.html")
	})

	//  
	// capturo control-c para cerrar el servicio ordenadamente
	//  
	process.on('SIGINT', function () {
		console.log(" terminando ")
		servicio.close()
	})
} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
main()

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
