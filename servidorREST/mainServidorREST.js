// --------------------------------------------------------------------------------
// MainServidorREST.js
// --------------------------------------------------------------------------------


var cors = require('cors')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")
require("dotenv").config()

const fs = require('fs')

const Logica = require("../logica/logica.js")
const { log } = require('console')
const { constants } = require('buffer')

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

	// .......................................................
	// POST /send-email/
	// .......................................................
	servidorExpress.post("/send-email", async function (peticion, respuesta) {
		console.log(" * POST /send-email")
		await laLogica.enviarCorreo()
		console.log("Hecho");
		respuesta.send("OK")
	}) //post // send-email
	// () 

	// .......................................................
    // GET /notificacion /id
    // .......................................................
    servidorExpress.get("/notificacion/:id", async function (peticion, respuesta) {
        console.log(" * GET /notificacion ");
        var id = peticion.params.id;
        console.log(id);
        // llamo a la función adecuada de la lógica
        var res = await laLogica.buscarNotificacion(id)
        console.log(res);
        // si el array de resultados no tiene una casilla ...

        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // get /todasMediciones

    // .......................................................
    // POST /insertarNotificacion
    // .......................................................
    servidorExpress.post("/insertarNotificacion", async function (peticion, respuesta) {
        console.log(" * POST /insertarNotificacion")
        var datos = JSON.parse(peticion.body)
        //console.log(datos.id)
        console.log(datos.ID_notificacion)
        console.log(datos.motivo)
        console.log(datos.mensaje)
        // console.log(datos.longitud)
        // console.log(datos.latitud)

        await laLogica.insertarNotificacion(datos)
        console.log("Hecho");
        respuesta.send("OK")
    }) // post /insertarMedicion
    // ()

	
	// .......................................................
	// GET /medicion/<id>
	// .......................................................
	servidorExpress.get("/buscarMedicionConID/:id", async function (peticion, respuesta) {
		console.log(" * GET /medicion id ")
		// averiguo el id
		var id = peticion.params.id
		// llamo a la función adecuada de la lógica
		var res = await laLogica.buscarMedicionConID(id)
		console.log(res);
		// todo ok
		respuesta.send(JSON.stringify(res))
	}) // get /medicion id


	// .......................................................
	// GET /todasMediciones
	//  R --> todasMediciones --> <{ID_medida: R, valor: R, fecha: Texto, Longitud: Z, Latitud: Z, ID_placa: R}>
	// .......................................................
	servidorExpress.get("/todasMediciones", async function (peticion, respuesta) {
		console.log(" * GET /todasMediciones ")
		// llamo a la función adecuada de la lógica
		var res = await laLogica.mostrarTodasMediciones()
		console.log(res);
		// si el array de resultados no tiene una casilla ...
		
		// todo ok
		respuesta.send(JSON.stringify(res))
	}) // get /todasMediciones


	// .......................................................
	// POST /insertarMedicion
	// {ID_medida: R, valor: R, fecha: Texto, Longitud: Z, Latitud: Z, ID_placa: R} --> insertarMedicion
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
	}) // post /insertarMedicion
	// () 

	// .......................................................
	// POST /insertarUsuario
	// {correo: Texto, contrasenya: Texto, telefono: R, nombre: Texto, apellidos: Texto, estado: Texto, ID_user: R} --> insertarUsuario
	// .......................................................
	servidorExpress.post("/insertarUsuario", async function (peticion, respuesta) {
		var error = null
		try{
			console.log(" * POST /insertarMedicion")
			var datos = JSON.parse(peticion.body)
			//console.log(datos.id)
			//console.log(datos.correo)
			//console.log(datos.telefono)
			//console.log(datos.nombre)
			//console.log(datos.apellidos)
			//console.log(datos.estado)
	
			await laLogica.insertarUsuario(datos)
			console.log("Hecho");
			respuesta.send("OK")
		}catch(err){
			console.log(err);
			console.log("No se ha creado usuario");

			err = error
			console.log(err);
			respuesta.send(err)

		}
		
	}) // post /insertarUsuario
	// () 

	// .......................................................
	// GET /usuario/<correo>
	// Texto --> GET usuario --> {correo: Texto, contrasenya: Texto, telefono: R, nombre: Texto, apellidos: Texto, estado: Texto, ID_user: R}
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
			respuesta.status(404).send("no encontré id: " + correo)
			return
		}
		// todo ok
		respuesta.send(JSON.stringify(res[0]))
	}) // get /usuario <correo>


	// .......................................................
	// GET /usuario/<id>
	// Int --> GET usuario --> {correo: Texto, contrasenya: Texto, telefono: R, nombre: Texto, apellidos: Texto, estado: Texto, ID_user: R}
	// .......................................................
	servidorExpress.get("/usuarioID/:id", async function (peticion, respuesta) {
		console.log(" * GET /usuarioID id ")
		// averiguo el id
		var id = peticion.params.id
		// llamo a la función adecuada de la lógica
		var res = await laLogica.buscarUsuarioID(id)
		console.log(res);
		// si el array de resultados no tiene una casilla ...
		if (res.length != 1) {
			// 404: not found
			respuesta.status(404).send("no encontré id: " + id)
			return
		}
		// todo ok
		respuesta.send(JSON.stringify(res[0]))
	}) // get /usuario <correo>



	// .......................................................
	// DELETE /borrarConID<id>
	// R --> DELETE borrarConID
	// .......................................................
	servidorExpress.delete("/borrarConID/:id", async function (peticion, respuesta) {
		console.log(" * DELETE /borrarConID/:id")
		// averiguo el id
		var id = peticion.params.id
		// llamo a la función adecuada de la lógica
		await laLogica.borrarFilasConID("medicion",id)
		console.log("Borrado");
		respuesta.send("OK")
	}) //delete /borrarConID <id>
	// () 

	
	// .......................................................
	// POST /auth<correo>
	// .......................................................
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

	}) //post /auth:correo 


	// .......................................................
	// GET /api
	// .......................................................
	servidorExpress.get("/api", async function (peticion, res) {
		laLogica.validateToken()
		console.log("Esto es seguro");
		res.send(JSON.stringify(res[0]))

	}) // get /api

	// .......................................................
	// POST /generateToke<datos>
	// .......................................................
	servidorExpress.post("/generateToken/:datos", async function (peticion, res) {
		console.log(" * POST /generateToken ")
		var datos = JSON.parse(peticion.body)
		console.log("server1 " + datos);

		var res2 = await laLogica.generateToken(datos)
		console.log("server " + res2);
		res.send(JSON.stringify(res2))

	}) // post /generateToken<datos>


	// .......................................................
	// GET /verify<datos>
	// .......................................................
	servidorExpress.get("/verify/:datos", async function (peticion, res) {
		var datos = JSON.parse(peticion.body)
		await laLogica.verifyTokenAuth()
		console.log("Esto es seguro");
		res.send(JSON.stringify(res[0]))

	}) // get /verify<datos>

	
	// .......................................................
	// POST /desencriptar<datos>
	// {hash: Texto, cont: Texto} --> POST desencriptar --> T/F
	// .......................................................
	servidorExpress.post("/desencriptar/:datos", async function (peticion, res) {
		console.log(" * POST /desencriptar ")
		var datos = JSON.parse(peticion.body)
		var res2 = await laLogica.desencriptar(datos)
		res.send(JSON.stringify(res2))

	}) // post /desencriptar<datos>

	

	// .......................................................
	// GET /desencriptar3
	// {hash: Texto, cont: Texto} --> GET desencriptar3 --> T/F
	// .......................................................
	servidorExpress.get("/desencriptar3", async function (peticion, res) {
		console.log(" * POST /desencriptar3")
		const hash = peticion.query.hash
		const cont = peticion.query.cont

		const datos = {hash: hash, cont: cont}
		//console.log(datos);
		var res2 = await laLogica.desencriptar(datos)
		console.log(res2);
		const resultado = {estado: res2}
		res.send(JSON.stringify(resultado))
		
	}) // get /desencriptar3


	// .......................................................
	// POST /actualizar
	// {correo: Texto, contrasenya: Texto, telefono: R, nombre: Texto, apellidos: Texto, estado: Texto, ID_user: R} --> POST actualizar
	// .......................................................
	servidorExpress.post("/actualizar", async function (peticion, res) {
		console.log(" * POST /actualizar")
		
		var datos = JSON.parse(peticion.body)
		console.log(datos.ID_user)
		console.log(datos.correo)
		console.log(datos.telefono)
		console.log(datos.nombre)
		console.log(datos.apellidos)
		//console.log(datos.contrasenya)

		//console.log(datos.estado)
		await laLogica.cambiarDatosPersonales(datos)
		console.log("Hecho");
		res.send("OK")
	}) // post /actualizar

	// .......................................................
	// GET /placas/<ID_user>
	// .......................................................
	servidorExpress.get("/buscarPlacaConId/:ID_user", async function (peticion, respuesta) {
		console.log(" * GET /placa ID_user ")
		// averiguo el id
		var ID_user = peticion.params.ID_user;
		// llamo a la función adecuada de la lógica
		var res = await laLogica.buscarPlacaConId(ID_user);
		console.log(res);
		// si el array de resultados no tiene una casilla ...
		if (res.length != 1) {
			// 404: not found
			respuesta.status(404).send("no encontré placa con esa id: " + ID_user)
			return
		}
		// todo ok
		respuesta.send(JSON.stringify(res[0]))
	}) // get /medicion id

		// .......................................................
	// POST /cambiarContrasenya/correo 
	// .......................................................

	servidorExpress.post("/cambiarContrasenya", async function (peticion, res) {
		var error = null
		try{
			console.log(" * POST /cambiarContrasenya")
		
			var datos = JSON.parse(peticion.body)
			console.log(datos.correo)
		
			//console.log(datos.contrasenya)
	
			//console.log(datos.estado)
			await laLogica.cambiarContrasenya(datos)
			console.log("Hecho");
			res.send("OK")
		}catch(err){
			console.log(err);
			console.log("Ese usuario no existe");

			err = error
			console.log(err);
			res.send(err)
		}
		
	}) // post /actualizar
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
		console.log("servidor REST escuchando en el puerto 8080: http://localhost:8080/index.html")
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
