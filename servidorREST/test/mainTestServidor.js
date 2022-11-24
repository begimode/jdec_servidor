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


	it("probar GET /buscarPlacaConID:ID_user", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var ID_user = 1;
		var datos = {"ID_placa":1,"ID_user":1,"uuid":'test',"estadoPlaca":0}

		request.get(
			{
				url: IP_PUERTO + "/buscarPlacaConID/" + ID_user,
				headers: { 'User-Agent': 'Jorge', 'Content-Type': 'application/json' },
				body: JSON.stringify(datos)
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				//assert.equal(datos, JSON.parse(respuesta.body), "¿La uuid no es test?")
				//console.log(datos);
				//console.log(JSON.parse(respuesta.body));
				hecho()
			} // callback
		) // .post
	}) // it




	it("probar GET /usuario/:correo", function (hecho) {

		// esta función prueba está en logica/funciones/prueba
		var correo= "testServer4";
		var datos = {"correo":"testServer4","contrasenya":"$2a$10$UQwrZ.gcdCewhlKxs/ezjesdcAG1ff2OY7VSCwBdcIlM9akStFvpW","telefono":555,"nombre":"test","apellidos":"test","estado":"test","ID_user":10}

		request.get(
			{
				url: IP_PUERTO + "/usuario/" + correo,
				headers: { 'User-Agent': 'Jorge', 'Content-Type': 'application/json' },
				body: JSON.stringify(datos)
			},
			function (err, respuesta, carga) {
				assert.equal(err, null, "¿ha habido un error?")
				assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
				//assert.equal(respuesta.body.nombre, "test", "¿El nombre no es test?");
		
				hecho()
			} // callback
		) // .post
	}) // it


	it("probar GET /buscarMedicion/:id", function (hecho) {

        // esta función prueba está en logica/funciones/prueba
        var id_medida= 235;

        request.get(
            {
                url: IP_PUERTO + "/buscarMedicionConID/" + id_medida,
                headers: { 'User-Agent': 'Jorge', 'Content-Type': 'application/json' },
                body: JSON.stringify(id_medida)
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                //assert.equal(respuesta.body.nombre, "test", "¿El nombre no es test?");
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

