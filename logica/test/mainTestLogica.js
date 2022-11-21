
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
	// .................................................... funciona

	
	it("puedo insertar una medicion", async function () {
		var err = null; 
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
			var res = await laLogica.buscarMedicionConID("102")
			//assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			assert.equal(res[0].valor, 2, "¿no es 32?")
			

		} catch (error) {
			error = err;
		}
	})

	// it
	// ....................................................
	// .................................................... funciona

	
	it("puedo insertar una notificacion", async function () {
		try {
			await laLogica.insertarNotificacion(
				{
					id: null,
					motivo: "xd",
					mensaje: "David",
					fecha: "11/12/11",
					ID_user: 1,
					ID_placa: 1,
				}
			)
			var res = await laLogica.buscarNotificacion(11)
		} catch (error) {
			error = err;
		}
	})
	
	
	// it
	// ....................................................
	// .................................................... funciona
	it("correo", async function () {
		try {
			var configurarCorreo = {
				correo: "jiangchenyi52@gmail.com",
				text: "TEST",
				subject: "TEST JAJA"
			}
			await laLogica.enviarCorreo(configurarCorreo)
		   
		} catch (error) {
			error = err;
		}
	})
	

	

	// it
	// ....................................................
	// .................................................... funciona
	
	it("puedo insertar un usuario", async function () {
		try {
			await laLogica.insertarUsuario(
				{
					ID_user: null,
					correo: "test",
					contrasenya: "pepe",
					telefono: 643364675,
					nombre: "Jorge",
					apellidos: "Larrosa Quesada",
					estado: "No Verificado",
				}
			)
			var res = await laLogica.buscarUsuario("test")
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

	// it
	// ....................................................
	// ....................................................

	

	it("puedo actualizar los datos", async function () {
		var err = null
		try {
			var xd = {
				ID_user: 3,
				correo: "test",
				telefono: 56,
				nombre: "test",
				apellidos: "test",
				contrasenya: "test"
			}
			laLogica.cambiarDatosPersonales(xd)
			assert.equal(err, null, "¿ha habido un error?")
			//assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
		   
		} catch (error) {
			error = err;
		}
	})
	

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

