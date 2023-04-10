const express = require("express");
const { Router } = express
const os = require('os')
const router = Router()

const procesadores = os.cpus().length

router.get('/', (req, res) => {

    res.json({
        'Argumento de entrada': process.argv,
        'Nombre de la plataforma': process.platform,
        'Version de node.js': process.version,
        'Memoria total reservada': process.memoryUsage().rss,
        'Path de ejecucion': process.execPath,
        'Process id': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Procesadores': procesadores
    })
})

module.exports = router