// --------------------------------------------------------------------------------
// cargador.js
// --------------------------------------------------------------------------------
// 
// Carga los objetos-función que hayab en un directorio dado.
// Cada objeto debe tener un campo 'conexion' y una función llamada 'f()', que
// pueda depender de 'conexion'.
// Al cargarlo, inyecta el valor dependencia en 'conexion'
// Devuelve un objeto que contiene la lista de funciones cargadas y, expecialmente,
// una función f() para llamar a alguna de las funciones por su nombre pasándole
// los argumentos, y detectar si la llamada no ha funcionado.
//
// --------------------------------------------------------------------------------

const fs = require( 'fs' )

// --------------------------------------------------------------------------------
//
// nombreDir: Texto
// dependencia: TDep
//                 -->
//                    cargador()
//                 <--
// Logica = { 
//   f: ( Texto, TArg -> () -> TRes ),
//   [ { conexion: TDep, f: TArg -> () -> TRes } ]_Texto // array asociativo
// }
//
// --------------------------------------------------------------------------------
module.exports = function( nombreDir, dependencia ) {
	//
	// objeto directamente creado aquí (sin escribit la clase en otro lado ! )
	//
	var logica = {
		llamar: async function( nombreFuncion, args ) {
			// busco la funcion por su nombre
			var laFuncion = this[ nombreFuncion ]

			// compruebo que existe
			if ( laFuncion == null ) {
				throw ("Funcion no encontrada: " + nombreFuncion)
			}

			// llamo la función
			return laFuncion( args )
		} // f()
	} // logica

	// busco los ficheros que hay en nombreDir,
	// los cargo con require
	// les inyecto la dependencia
	// y los guardo
	fs.readdirSync( nombreDir ).forEach( function( fich ) {
		// console.log( " ***** cargando: " + fich )
		try {
			var obj = require( nombreDir + "/" + fich )
			// inyecto la dependencia (la conexión con la BD)
			obj.conexion = dependencia

			// inyecto una referencia a la propia logica, por
			// si una función de lógica quiere usar una otra
			// función de lógica "hermana"
			obj.logica = logica

			// guardo obj (== función de lógica) en el objeto
			// donde logica (que acumula estas funciones-objeto)
			logica[ fich ] = obj
		} catch( err ) {
			// ignoro errores al cargar
			// console.log( "         error cargando: " + fich + " " + err )
		}
	})

	// devuelvo el resultado
	return logica
} // ()

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
