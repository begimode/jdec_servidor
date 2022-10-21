// ---------------------------------------------------
// buscarMedidaConID.js
// En este archivo se encuentra la función de la lógica Fake
// que devolverá la medida que contenga la id recibida
// ---------------------------------------------------

//const { stringify } = require("querystring")

function buscarMedidaConID( datos, cb ) {
	llamarBuscarMedida( "http://localhost:8080/buscarMedidaID/" + datos, cb )

} // ()

// ---------------------------------------------------
//
// llama a una función remota enviando POST <nombreFuncion>
//
// ---------------------------------------------------
function llamarBuscarMedida( nombreFuncion, cb ) {
	console.log("Inicio llamarBuscarMedida() -> LogicaFake");

	// preparar la llamada remota
	var xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function() {
		// callback para cuando llegue la respuesta
		// de la petición que haremos más abajo

		if( this.readyState == 4 && this.status == 200 ){

			// este es el texto que recibo.
			console.log( "recibo: " + this.responseText )

			var resultado = this.responseText

			//
			// Puede ser JSON o no.
			// Intento pasarlo a JSON, si puedo: es eso lo que devuelve
			// Si no: se queda como estaba
			//
			try {

				resultado = JSON.parse( resultado )

				console.log( "no he podido hacer parse de " + resultado )
				
			} catch( error )  {
			}

			// en todo caso, aqui el primer parámetro (error = null, porque
			// estoy dentro de status == 200)
			// Los errores en el uso de la función de la lógica
			// que los maneje a su antojo la función
			cb( null, resultado ) 

		} // if( this.readyState == 4 && this.status == 200 ){

		else if( this.readyState == 4 && this.status != 200 ){
			// el status no es 200
			cb( this.status, null )
		}

	} //  xmlhttp.onreadystatechange = function() {

	// console.log( "parametrosLlamada =" + parametrosLlamada )
	// console.log( "parametrosLlamada =" + JSON.stringify( parametrosLlamada ) )
	
	//
	// llamamos *remotamente* 
	// (la verdadera función de la lógica)
	//
	xmlhttp.open("GET", nombreFuncion, true)
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send()

} // ()
