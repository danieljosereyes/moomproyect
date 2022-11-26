const express = require('express')
const Product = require('../container/containerProduct.js')
const product = express.Router()

const dbProduct = new Product('./db/product.txt')


product.get('/', async (req, res) => {
    const result = await dbProduct.getAll()
    res.json(result)
})
product.post('/', async(req, res) => {
    const result = req.body
    await dbProduct.save(result)
    res.send({
        status: "ok"
    })
})
product.put('/:id', async (req, res) => {
    const array = req.body
    const id = req.params.id
    const result = await dbProduct.update(id, array)
    res.send({
        status: "ok"
    })
})
product.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await dbProduct.deleteById(id)
    console.log(result)
    res.send({
        status: id
    })
})


module.exports = product