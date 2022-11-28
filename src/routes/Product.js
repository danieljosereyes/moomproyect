//Require
const express = require('express')
const Product = require('../container/containerProduct.js')
const product = express.Router()
//Constructor productos
const dbProduct = new Product('./db/product.txt')

//Permiso para administradores " key: admin  valuer: true "
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
//Obtiene el array de productos para "Usuarios y administradores""
product.get('/', async (req, res) => {
    const result = await dbProduct.getAll()
    
    res.json(result)
})
//Crear la data de los productos solo para "administradores"
product.post('/', administrador, async(req, res) => {
    const result = req.body
    await dbProduct.save(result)
    if(result.length == 0) {
        res.json("no hay productos")
      } else{
      res.json(result)  
      }
})
//Actualiza productos por id solo para "administradores"
product.put('/:id', administrador,async (req, res) => {
    const array = req.body
    const id = req.params.id
    const result = await dbProduct.update(id, array)
    res.json({result})
})
//Elimina productos por id solo para "adimistradores"
product.delete('/:id', administrador, async (req, res) => {
    const id = req.params.id
    const result = await dbProduct.deleteById(id)
    console.log(result)
    res.json({id})
})

module.exports = product