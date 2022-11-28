const express = require('express')
const routeProduct = require('./routes/Product.js')
const routerShoppingCart = require('./routes/ShoppingCart.js')



//express
const app = express()

const PORT = 8080

//Unlecoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Rutas
app.use('/api/productos', routeProduct)
app.use('/api/carrito', routerShoppingCart)

//Middleware
app.use((req, res, next) => {
    if (!req.route) {
        res.status(404).send({
            error: -2,
            descripcion: `Ruta: ${req.url} no encontrada`
        })
    } else {
        next()
    }
})

//Servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor excuchando el puerto: ${server.address().port}`)
})

server.on('error', error => console.log(`Error: ${error}`))