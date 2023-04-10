"use strict";

var express = require("express");
var Router = express.Router;
var os = require('os');
var router = Router();
var procesadores = os.cpus().length;
router.get('/', function (req, res) {
  res.json({
    'Argumento de entrada': process.argv,
    'Nombre de la plataforma': process.platform,
    'Version de node.js': process.version,
    'Memoria total reservada': process.memoryUsage().rss,
    'Path de ejecucion': process.execPath,
    'Process id': process.pid,
    'Carpeta del proyecto': process.cwd(),
    'Procesadores': procesadores
  });
});
module.exports = router;