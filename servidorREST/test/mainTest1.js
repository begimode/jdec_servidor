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

	
	it("probar POST /insertarMedicion", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			id: null, valor: 1, fecha: "prueba", nombreSensor: "Test", longitud: 1, latitud: 2, ID_placa: 1
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
			ID_user: null, correo: "testServer4", contrasenya: "test", telefono: 555, nombre: "test", apellidos: "test", estado: "test"
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

	it("probar POST /actualizar", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			ID_user: "4", correo: "juan", telefono: 555, nombre: "test", apellidos: "test" , contrasenya : "jijijaja"
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
	
	// ........................................................................... 
	// .4
	// ........................................................................... 

	it("probar POST /cambiarContrasenya", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var datos = {
			ID_user: "4", correo: "juan", telefono: 555, nombre: "test", apellidos: "test" , contrasenya : "jijijaja"
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

