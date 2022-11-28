const express = require('express')
const ShoppingCart = require('../container/containerShoppingCart.js')
const shoppingCart = express.Router()

const dbShoppingCart = new ShoppingCart('./db/shoppingCart.txt')

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


shoppingCart.post('/', async (req, res) => {
    let result = req.body
    await dbShoppingCart.save(result)

    res.send({
        status: "ok"
    })
})

shoppingCart.delete('/:id', async(req, res) => {
    let id = req.params.id
    await dbShoppingCart.deleteById(id)

    res.send({
        status: "ok"
    })
})

shoppingCart.get('/:id/productos', async (req, res) => {
    let id = req.params.id
    let information = await dbShoppingCart.getProductCartById(id)

    res.json([information])
})

shoppingCart.post('/:id/productos', async (req, res) => {
    let id = req.params.id
    let product = req.body
    await dbShoppingCart.saveIdShoppingCart(id, product)

    res.send({
        status: "ok"
    })
})
shoppingCart.delete('/:id/productos/:id_prod', async (req, res) => {
    let idCart = req.params.id
    let idProduct = req.params.id_prod
    await dbShoppingCart.deleteProductById(idCart, idProduct)
    res.send({
        status: idCart,
        clausura: idProduct
    })
})

module.exports = shoppingCart