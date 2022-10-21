// --------------------------------------------------------------------------------
// mainServidorREST.js
// En este archivo se arranca el servidot y se hacen las peticiones POST y GET al servidor
// --------------------------------------------------------------------------------

const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");

const Logica = require("../logica/logica.js");

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
  // GET /medida/
  // .......................................................
  servidorExpress.get("/mostrarMedidas/", async function (peticion, respuesta) {
    console.log(" * GET /mostrarMedidas");

    // llamo a la función adecuada de la lógica
    var res = await laLogica.mostrarMedidas();
    // todo ok
    respuesta.send(JSON.stringify(res));
  }); // get /medida



  // .......................................................
  // GET /buscarMedidaID/<id>
  // .......................................................
  servidorExpress.get("/buscarMedidaID/:id", async function (peticion, respuesta) {
    console.log(" * GET /buscarMedidaID ");

    // averiguo la id
    var id = peticion.params.id;

    // llamo a la función adecuada de la lógica
    var res = await laLogica.buscarMedidaPorID(id);

    // si el array de resultados no tiene una casilla ...
    if (res.length != 1) {
      // 404: not found
      respuesta.status(404).send("no encontré medida con esa id: " + id);
      return;
    }
    // todo ok
    respuesta.send(JSON.stringify(res[0]));
  }); // get /medida



  // .......................................................
  // POST /insertarMedida
  // .......................................................
  servidorExpress.post("/insertarMedida", async function (peticion, respuesta) {
    console.log(" * POST /insertarMedida ");
    var datos = JSON.parse(peticion.body);
    // supuesto procesamiento
	  await laLogica.insertarMedida(datos);

	  respuesta.send("OK");
  }); //


  // .......................................................
  // GET /medida/<nombre>
  // .......................................................
  servidorExpress.get("/buscarMedidaNombre/:nombreSensor", async function (peticion, respuesta) {
    console.log(" * GET /buscarMedidaNombre ");

    // averiguo el nombre
    var nombreSensor = peticion.params.nombreSensor;

    // llamo a la función adecuada de la lógica
    var res = await laLogica.buscarMedidaPorNombre(nombreSensor);

    // si el array de resultados no tiene una casilla ...
    if (res.length != 1) {
      // 404: not found
      respuesta.status(404).send("no encontré medida con ese nombre: " + nombreSensor);
      return;
    }
    // todo ok
    respuesta.send(JSON.stringify(res[0]));
  }); // get /medida:nombre


  // .......................................................
  // DELETE /medida/<nombre>
  // .......................................................
  servidorExpress.delete("/borrarMedidaPorNombre/:nombreSensor", async function (peticion, respuesta) {
    console.log(" * DELETE /borrarMedidaPorNombre ");

    // averiguo el nombre
    var nombreSensor = peticion.params.nombreSensor;

    // llamo a la función adecuada de la lógica
    var res = await laLogica.borrarMedidaPorNombre(nombreSensor);

    // si el array de resultados no tiene una casilla ...
    if (res.length != 0) {
      // 404: not found
      respuesta.status(404).send("no encontré medida con ese nombre: " + nombreSensor);
      return;
    }
    // todo ok
    respuesta.status(200).send("La medida ha sido borrada")
  }); // delete /medida:nombre



} //()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
function main() {
  //
  //  cargo logica abriendo conexión
  //
  //var laLogica = await logica( "../bd/datos.bd" )
  var laLogica = null;
  laLogica = new Logica("../bd/medidas.bd", function (err) {
    if (err) {
      throw new Error("No he podido conectar con medidas.bd");
    }
  });

  //
  // creo el servidor 
  //
  var servidorExpress = express();

  //
  // para poder acceder a la carga de la petición http
  // (asumiendo que es JSON) hay que hacer esto:
  //
  // OK: original:
  servidorExpress.use(bodyParser.text({ type: "application/json" }));

  // Me ha dado problemas: servidorExpress.use( express.json() )

  // no creo que necesite esto: servidorExpress.use(express.urlencoded({ extended: true }));

  //
  // cargo las reglas REST
  //
  cargarReglasUniversales(servidorExpress, laLogica);

  //
  // configuración automática para que sirva ficheros de ../ux
  //
  servidorExpress.use(express.static("../ux"));

  //
  // arranco el servidor
  //
  var servicio = servidorExpress.listen(8080, function () {
    console.log(
      "servidor REST escuchando en el puerto 8080: http://localhost:8080/Aplicacion.html "
    );
  });

  //
  // capturo control-c para cerrar el servicio ordenadamente
  //
  process.on("SIGINT", function () {
    console.log(" terminando ");
    servicio.close();
  });
} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
main();

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
