
// ........................................................
// mainTestLogica.js
// En este archivo se ejecutan los tests de la lógica, insertar Medida, BuscarMedida y Borrar medida
// ........................................................
const Logica = require("../Logica.js");
var assert = require("assert");
// ........................................................
// main ()
// ........................................................
describe("Test 1: Insertar Medida", function () {
  // ....................................................
  // ....................................................
  var laLogica = null;

  it("conectar a la base de datos", function (hecho) {
    laLogica = new Logica("../bd/medidas.bd", function (err) {
      if (err) {
        throw new Error("No he podido conectar con medidas.db");
      }
      hecho();
    });
  }); // it


  // ....................................................
  // ....................................................
  it("Insertar Medida", async function () {
    await laLogica.insertarMedida(
        {
            id: null,
            medida: "medidaTestLogica",
            fecha: "fechaTestLogica",
            nombreSensor: "nombreTestLogica",
            latitud: "latitudTestLogica",
            longitud: "longitudTestLogica"
        })

    var res = await laLogica.buscarMedidaPorNombre("nombreTestLogica");
    assert.equal(res.length, 1, "¿no hay un resulado?");
    assert.equal(res[0].medida, "medidaTestLogica", "¿no es medidaTestLogica?");
    assert.equal(res[0].fecha, "fechaTestLogica", "¿no es medidaTestLogica?");
    assert.equal(res[0].latitud, "latitudTestLogica", "¿no es latitudTestLogica?");
    assert.equal(res[0].longitud, "longitudTestLogica", "¿no es longitudTestLogica?");
  }); // it


  
  // ....................................................
  // ....................................................
  it("Buscar medida por nombre", async function () {
        var res = await laLogica.buscarMedidaPorNombre("nombreTestLogica");
        assert.equal(res.length, 1, "No existe medida con ese nombre");
  }); // it



  // ....................................................
  // Test para borrar la medida insertada en el test anterior
  // ....................................................
  it("Borrar medida Test", async function () {

    await laLogica.borrarMedidaPorNombre("nombreTestLogica");
    var res = await laLogica.buscarMedidaPorNombre("nombreTestLogica");
    assert.equal(res.length, 0, "Se ha borrado la medida test")
  }); // it


  // ....................................................
  // ....................................................
  it("cerrar conexión a la base de datos", async function () {
    try {
      await laLogica.cerrar();
    } catch (err) {
      throw new Error("cerrar conexión a BD fallada: " + err);
    }
  }); // it
})
