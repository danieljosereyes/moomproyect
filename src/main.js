const express = require('express')
const routeProduct = require('./routes/Product.js')



//express
const app = express()

const PORT = 8080

//Unlecoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Rutas
app.use('/api/productos', routeProduct)
app.use('/api/carrito', routeProduct)

//Servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor excuchando el puerto: ${server.address().port}`)
})

server.on('error', error => console.log(`Error: ${error}`))