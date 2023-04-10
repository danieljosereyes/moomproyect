"use strict";

var randoms = function randoms(cantidad) {
  var valor = [];
  for (var i = 0; i < cantidad; i++) {
    var element = Math.floor(Math.random() * 1000);
    valor.push(element);
  }
  return valor;
};
process.on('message', function (cantidad) {
  // console.log(cantidad)
  var random = randoms(cantidad);
  // console.log(sum)
  process.send(random);
  process.exit(1);
});
process.send("listo");