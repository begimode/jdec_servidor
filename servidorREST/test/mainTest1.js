// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
const request = require('request')
const assert = require('assert')

const IP_PUERTO = "http://localhost:8080"

// --------------------------------------------------------------------------------
// main ()
// --------------------------------------------------------------------------------
describe("Test 1: prueba funcionamiento (recuerda arrancar el servidor)", function () {

	
	// ........................................................................... 
	// .1 
	// ........................................................................... 
	
	/*
	
	it("probar POST /insertarMedicion", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			id: null, valor: 1, fecha: "prueba", nombreSensor: "Test", longitud: 1, latitud: 2
		}

		request.post(
			{
				url: IP_PUERTO + "/insertarMedicion",
				headers: { 'User-Agent': 'Jorge', 'Content-Type': 'application/json' },
				body: JSON.stringify(datos)
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				hecho()
			} // callback
		) // .post
	}) // it

	// ........................................................................... 
	// .2
	// ........................................................................... 
	
	
	it("probar POST /insertarUsuario", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			correo: "testServer3", contrasenya: "test", telefono: 555, nombre: "test", apellidos: "test", estado: "test"
		}

		request.post(
			{
				url: IP_PUERTO + "/insertarUsuario",
				headers: { 'User-Agent': 'Jorge', 'Content-Type': 'application/json' },
				body: JSON.stringify(datos)
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				hecho()
			} // callback
		) // .post
	}) // it
	
	// ........................................................................... 
	// .3
	// ........................................................................... 
	
	/*
	it("probar GET /usuario", function (hecho) {
		request.get(
			{
				url: IP_PUERTO + "/usuario/testServer",
				headers: { 'User-Agent': 'Jorge' }
			},
			function (err, respuesta, carga) {
				var solucion = JSON.parse(carga)
				//console.log(solucion[0]);
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				assert.equal(solucion.correo, "testServer", "¿no esta bien el correo?")
				hecho()
			} // callback
		) // .get
	}) // it

	// ........................................................................... 
	// .4
	// ........................................................................... 

	it("probar GET /todasMediciones", function (hecho) {
		request.get(
			{
				url: IP_PUERTO + "/todasMediciones",
				headers: { 'User-Agent': 'Jorge' }
			},
			function (err, respuesta, carga) {
				var solucion = JSON.parse(carga)
				//console.log(solucion[0]);
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				assert.equal(solucion[1].id, 8, "¿no esta bien el nombre?")
				assert.equal(solucion[1].valor, 55, "¿no esta bien el nombre?")
				hecho()
			} // callback
		) // .get
	}) // it

	// ........................................................................... 
	// .5
	// ........................................................................... 
	
	it("probar * DELETE /borrarConID/:id", function (hecho) {

		request.delete(
			{
				url: IP_PUERTO + "/borrarConID/35" ,
				headers: { 'User-Agent': 'Jorge'},
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				hecho()
			} // callback
		) // .post
	}) // it
	

	it("probar GET /desencriptar3", function (hecho) {
		var hash = "pe"
		var cont = "h"
		request.get(
			{
				url: IP_PUERTO + "/desencriptar3?cont=" + cont +"&hash=" + hash,
				headers: { 'User-Agent': 'Jorge' }
			},
			function (err, respuesta, carga) {
				var solucion = JSON.parse(carga)
				//console.log(solucion[0]);
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				assert.equal(solucion[1].id, 8, "¿no esta bien el nombre?")
				assert.equal(solucion[1].valor, 55, "¿no esta bien el nombre?")
				hecho()
			} // callback
		) // .get
	}) // it

	

	it("probar GET /desencriptar3", function (hecho) {
		var hash = "$2a$10$oOf7zoM5q8zFuTGCTosJFu9F24xvE3lEzjCZ66t2Pg/XsXGRJwev6"
		var cont = "juan"
		request.get(
			{
				url: IP_PUERTO + "/desencriptar3?hash="+hash+"&cont="+cont ,
				headers: { 'User-Agent': 'Jorge' }
			},
			function (err, respuesta, carga) {
				var solucion = JSON.parse(carga)
				//console.log(solucion[0]);
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				//console.log(solucion);
				hecho()
			} // callback
		) // .get
	}) // it
	*/

	it("probar POST /actualizar", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			correoActual: "test", correo: "juan", telefono: 555, nombre: "test", apellidos: "test"
		}

		request.post(
			{
				url: IP_PUERTO + "/actualizar",
				headers: { 'User-Agent': 'Jorge', 'Content-Type': 'application/json' },
				body: JSON.stringify(datos)
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				hecho()
			} // callback
		) // .post
	}) // it
	

}) // describe

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

