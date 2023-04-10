const { Router } = require('express')
const router = Router()

const { verifyToken } = require('../middelwares')
// console.log(verifyToken)
const {  getProducts, createProduct, getProductById, updateProductById, deleteProductById  } = require('../controllers/products.controller.js')

router.post('/', verifyToken, createProduct)

router.get('/', getProducts)

router.get('/:productId', getProductById)

router.put('/:productId', verifyToken, updateProductById)

router.delete('/:productId', verifyToken, deleteProductById)

module.exports = router