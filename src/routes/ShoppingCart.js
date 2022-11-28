const express = require('express')
const Product = require('../container/containerProduct.js')
const ShoppingCart = require('../container/containerShoppingCart.js')
const shoppingCart = express.Router()

const dbShoppingCart = new ShoppingCart('./db/shoppingCart.txt')
const dbProduct = new Product('./db/product.txt')


//Crea el carrito de compras
shoppingCart.post('/', async (req, res) => {
    let result = await dbShoppingCart.save()

    res.json(result)
})
//elimina el carrito completo por id
shoppingCart.delete('/:id', async(req, res) => {
    let id = req.params.id
    await dbShoppingCart.deleteById(id)

    res.send({
        status: "ok"
    })
})
//Obtiene el Carrito de productos
shoppingCart.get('/:id/productos', async (req, res) => {
    let id = req.params.id
    let information = await dbShoppingCart.getProductCartById(id)
    if (information.length == 0) {
        res.json("No hay Productos")
    } else {
        res.json([information])   
    }
})
//Ubica el carrito por id y le agrega un producto por el id indicado
//Si no ubica el carrito, creara uno y agregara el producto por el id indicado
shoppingCart.post('/:id/productos', async (req, res) => {
    let id = req.params.id
    let result = await dbProduct.getById(id)
    await dbShoppingCart.saveIdShoppingCart(id, result)

    res.json(result)
})
//Ubica el carrito por id y le elimina un producto encontrado
shoppingCart.delete('/:id/productos/:id_prod', async (req, res) => {
    let idCart = req.params.id
    let idProduct = req.params.id_prod
    let condition = await dbShoppingCart.deleteProductById(idCart, idProduct)
    if (condition) {
        res.json({
            idCart: idCart,
            idProduct: `Delete Product id: ${idProduct}`
        })
    } else {
        res.json({
            status: "No exite el producto"
        })
    }
})

module.exports = shoppingCart