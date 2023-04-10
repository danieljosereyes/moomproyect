const express = require("express");
const { Router } = express
const { fork } = require('child_process')


const router = Router()


router.get('/', async (req, res) => {
    const cantidad = await parseInt(req.query.cantidad)
       
    const computo = fork('./api/random.js')
      
    computo.on('message', randoms => {
        if(randoms == "listo") {
     
            computo.send(cantidad)
        }else {
      
            res.json({randoms})
        }
    })
    computo.on('exit', code => {
        console.log(`saliendo del process, codigo: ${code}`)
    })
})




module.exports = router