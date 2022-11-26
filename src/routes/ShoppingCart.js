const express = require('express')
const ShoppingCart = require('../container/containerShoppingCart.js')
const shoppingCart = express.Router()


const estructura = {
    id: 1,
    timestamp: Date.now(),
    productos: {
        id: 2,
        timestamp: 1,
        nombre: "balon",
        descripcion: "balon de futbol",
        codigo: 4161,
        foto: "url",
        precio: 10,
        stock: 3
    }
}


shoppingCart.post('/', (req, res) => {
    res.send({
        status: "ok"
    })
})
shoppingCart.delete('/:id', (req, res) => {
    res.send({
        status: "ok"
    })
})
shoppingCart.get('/', (req, res) => {
    res.send({
        status: "ok"
    })
})
shoppingCart.post('/:id', (req, res) => {
    res.send({
        status: "ok"
    })
})
shoppingCart.delete('/:id', (req, res) => {
    res.send({
        status: "ok"
    })
})


module.exports = shoppingCart