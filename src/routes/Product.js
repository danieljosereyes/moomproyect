const express = require('express')
const Product = require('../container/containerProduct.js')
const product = express.Router()

const dbProduct = new Product('./db/product.txt')
const administrador = (req, res, next) => {
    const admin = req.headers.admin
    if (admin === 'true') {
        next()
    } else {
        res.status(401).send({
            error: -1,
            descripcion: `Ruta: ${req.url} no autorizada`
        })
    }
}

product.get('/', async (req, res) => {
    const result = await dbProduct.getAll()
    res.json(result)
})
product.post('/', administrador, async(req, res) => {
    const result = req.body
    await dbProduct.save(result)
    res.send({
        status: "ok"
    })
})
product.put('/:id', administrador,async (req, res) => {
    const array = req.body
    const id = req.params.id
    const result = await dbProduct.update(id, array)
    res.send({
        status: "ok"
    })
})
product.delete('/:id', administrador, async (req, res) => {
    const id = req.params.id
    const result = await dbProduct.deleteById(id)
    console.log(result)
    res.send({
        status: id
    })
})


module.exports = product