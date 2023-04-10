const { Router } = require('express')
const router = Router()

const {  getProducts, createProduct, getProductById, updateProductById, deleteProductById  } = require('../controllers/products.controller.js')

router.post('/', createProduct)

router.get('/', getProducts)

router.get('/:productId', getProductById)

router.put('/:productId', updateProductById)

router.delete('/:productId', deleteProductById)

module.exports = router