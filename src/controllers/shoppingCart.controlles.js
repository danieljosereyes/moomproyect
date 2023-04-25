const ShoppingCart = require('../models/ShoppingCart')

const createCartAndGetId = async (req, res) => {
    try {
        const { email, productos, direccion } = req.body

        const newShoppingCart = new ShoppingCart({
            email,
            productos,
            direccion,
        })

        const cartSaved = await newShoppingCart.save()

        res.status(201).json(cartSaved)
    } catch (error) {
        console.error(error)
    }
}

const deleteCartById = async (req, res) => {
    try {
        const { cartId } = req.params
        
        const deleteCart = await ShoppingCart.findByIdAndDelete(cartId)
        if (!deleteCart) res.status(204).json({ mensaje: "Carrito no encontrado" })
        res.status(204).json({ mensaje: "Carrito eliminado" })
    } catch (error) {
        console.error(error)
    }
}

const getProductByIdCart = (req, res) => {
    const { cartId } = req.params
    console.log(cartId)
    res.json({ mensaje: "get Product By Id Cart"})
}

module.exports = {
    createCartAndGetId,
    deleteCartById,
    getProductByIdCart
}