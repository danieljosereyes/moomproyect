const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    imgUrl: String,
    precio: Number,
    descripcion: String,
    categoria: String
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Product', productSchema)