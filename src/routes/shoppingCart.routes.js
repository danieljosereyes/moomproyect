const { Router } = require('express')
const router = Router()

const { createCartAndGetId, deleteCartById, getProductByIdCart } = require('../controllers/shoppingCart.controlles')

router.post('/', createCartAndGetId)

router.delete('/:cartId', deleteCartById)

router.get('/:cartId/product', getProductByIdCart)
router.post('/:cartId/product', (req, res) => {
    res.json({
        mensaje: 'carrito de compras'
    })
})
router.delete('/:cartId/product/:id_prod', (req, res) => {
    res.json({
        mensaje: 'carrito de compras'
    })
})

module.exports = router