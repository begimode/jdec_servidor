// ........................................................
// mainTest1.js
// En este archivo se ejecutan los tests del servidor, Insertar medida, Buscar medida y borrar la medida insertada
// ........................................................
var request = require("request");
var assert = require("assert");
const Logica = require("../../logica/Logica.js");
// ........................................................
// ........................................................
const IP_PUERTO = "http://localhost:8080";
// ........................................................
// main ()
// ........................................................
describe("Test 1 : Recuerda arrancar el servidor", function () {
  // ....................................................
  // ....................................................

  it("probar POST /insertarMedida", function (hecho) {
    var datosMedida = {
      id: 0,
      medida: "MedidaTestServ",
      fecha: "FechaTestServ",
      nombreSensor: "nombreTestServ",
      longitud: "LongitudTestServ",
      latitud: "LatitudTestServ"
    };
    //var JSONpost = JSON.stringify(datosMedida)
    request.post(
  {
    url: IP_PUERTO + "/insertarMedida",
    headers: { "User-Agent": "David", "Content-Type": "application/json" },
    body: JSON.stringify(datosMedida),
  },
  function (err, respuesta, carga) {
    assert.equal(err, null, "¿ha habido un error?" + err);
    assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
    hecho();
  } // callback
); // .post
}); // it



  // ....................................................
  // ....................................................
  it("probar que GET /buscarMedida responde", function (hecho) {
    request.get(
      { url: IP_PUERTO + "/buscarMedidaID/0", headers: { "User-Agent": "David" } },
      function (err, respuesta, carga) {

        var datosMedida = {
          id: 0,
          medida: "MedidaTestServ",
          fecha: "FechaTestServ",
          nombreSensor: "nombreTestServ",
          longitud: "LongitudTestServ",
          latitud: "LatitudTestServ"
        };
        var JSONpost = JSON.stringify(datosMedida)
        
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        assert.equal(carga, JSONpost, "¿La carga no es ¡Funciona!?");
        hecho();
      } // callback()
    ); // .get
  }); // it




it("Borrar medida prueba Servidor", function (hecho) {
  request.delete(
    { url: IP_PUERTO + "/borrarMedidaPorNombre/nombreTestServ", headers: { "User-Agent": "David" } },
    async function (err, respuesta, carga) {

      //var res = await laLogica.borrarMedidaNombreAsync("nombreTestServ")
      
      assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
      assert.equal(err, null, "¿No se ha borrado?");
      hecho();
    } // callback()
  ); // .get
}); // it



  // ....................................................
  // ....................................................

  
}); // describe
