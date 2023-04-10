const Product = require('../models/Product')

const createProduct = async (req, res) => {
    const { imgUrl, precio, descripcion, categoria } = req.body

    const newProduct = new Product({imgUrl, precio, descripcion, categoria})

    const productSaved = await newProduct.save()

    console.log(req.body)

    res.status(201).json(productSaved)
}
    
const getProducts = async (req, res) => {
    const products = await Product.find()

    res.json(products)
}

const getProductById = async (req, res) => {
    const { productId } = req.params

    const product = await Product.findById(productId)

    res.status(200).json(product)
}

const updateProductById = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })

    res.status(200).json(updateProduct)
}

const deleteProductById = async (req, res) => {
    const { productId } = req.params

    await Product.findByIdAndDelete(productId)

    res.status(204).json()
    
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}