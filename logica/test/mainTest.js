
// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................

// es donde empieza la prueba del test 

describe("Test 1: Funcionamiento de la logica", function () {
	// ....................................................
	// ....................................................
	var laLogica = null
	// ....................................................
	// ....................................................
	it("conectar a la base de datos", function (hecho) {  // la prueba concreta, el cual tiene su tittulo y un callback con una funcion con cualquier nombre. 
		laLogica = new Logica(  // crear un objeto --> 
			"../bd/dbmedicion",
			function (err) {
				if (err) {
					throw new Error("No he podido conectar con datos.db")
				}
				hecho()
			})
	})

	// it
	// ....................................................
	// ....................................................
	//it("borrar todas las filas", async function () {
	//	await laLogica.borrarFilasDeTodasLasTablas()
	//})

	// it
	// ....................................................
	// ....................................................

	/*
	it("puedo insertar una medicion", async function () {
		try {
			await laLogica.insertarMedicion(
				{
					id: null,
					valor: 2,
					fecha: "30/09/2022",
					nombreSensor: "test.js",
					longitud: 39,
					latitud: 0,
					ID_placa: 1,
				}
			)
			var res = await laLogica.buscarMedicionConID("34")
			//assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			assert.equal(res[0].valor, 2, "¿no es 32?")
			

		} catch (error) {
			error = err;
		}
	})
*/
	// it
	// ....................................................
	// ....................................................

	
	it("puedo insertar una notificacion", async function () {
		try {
			await laLogica.insertarNotificacion(
				{
					id: null,
					motivo: "Gilipollas",
					mensaje: "David HACKER",
					fecha: "11/12/13",
					ID_user: 1,
					ID_placa: 1,
				}
			)
			var res = await laLogica.buscarNotificacion(1)
		} catch (error) {
			error = err;
		}
	})

	  // it
	// ....................................................
	// ....................................................
	
	/*
	it("puedo mostrar todas las medicion", async function () {
		try {
			var res = await laLogica.mostrarTodasMediciones()
			assert.equal(res[1].id, 8, "¿no es 1?")
			assert.equal(res[0].valor, 55, "¿no es 12?")  // el assert es un if 
		   
		} catch (error) {
			error = err;
		}
	})

	// it
	// ....................................................
	// ....................................................
	it("correo", async function () {
		try {
			await laLogica.enviarCorreoTest()
		   
		} catch (error) {
			error = err;
		}
	})


	/*
	it("puedo borrar el daton que he añadido", async function () {
		try {
			await laLogica.borrarFilasConID("medicion","34")
		} catch (error) {
			error = err;
		}
	})

	// it
	// ....................................................
	// ....................................................
	*
	it("puedo insertar un usuario", async function () {
		try {
			await laLogica.insertarUsuario(
				{
					ID_user: null,
					correo: "juan@gmail.com",
					contrasenya: "pepe",
					telefono: 643364675,
					nombre: "Jorge",
					apellidos: "Larrosa Quesada",
					estado: "No Verificado",
				}
			)
			var res = await laLogica.buscarUsuario("pepe@gmail.com")
			assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			//assert.equal(res[0].correo, "jorgelarrosaquesada@gmail.com", "¿no es jorgelarrosaquesada@gmail.com?")
			//assert.equal(res[0].contrasenya, "pepe", "¿no es pepe?")

		} catch (error) {
			error = err;
		}
	})
	
	it("puedo insertar una placa", async function () {
		try {
			await laLogica.insertarPlaca(
				{
					ID_placa: null,
					ID_user: 1,
					uuid: "test",
					estadoPlaca: 0,
				}
			)
			var res = await laLogica.buscarPlaca(1)
			//assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			//assert.equal(res[0].correo, "jorgelarrosaquesada@gmail.com", "¿no es jorgelarrosaquesada@gmail.com?")
			//assert.equal(res[0].contrasenya, "pepe", "¿no es pepe?")

		} catch (error) {
			console.log(error);
		}
	})
*/

	/*
	it("auth", async function () {
		try {
			var res = await laLogica.generateAccessToken("juan")

		} catch (error) {
			error = err;
		}
	})

	// it
	// ....................................................
	// ....................................................

	

	it("puedo actualizar los datos", async function () {
		try {
			var res = await laLogica.cambiarDatosPersonales({
				correoActual: "lucas",
				correo: "juan",
				telefono: 56,
				nombre: "juan",
				apellidos: "juan"
			})
			
			assert.equal(err, null, "¿ha habido un error?")
			//assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
		   
		} catch (error) {
			error = err;
		}
	})
	*/

	it("cerrar conexión a la base de datos",
		async function () {
			try {
				await laLogica.cerrar()
			} catch (err) {
				// assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
				throw new Error("cerrar conexión a BD fallada: " + err)
			}
		}
	) // it

})

