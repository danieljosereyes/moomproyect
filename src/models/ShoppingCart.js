const { Schema, model } = require('mongoose')

const shoppingCart = new Schema({
    email: String,
    productos: Array,
    direccion: String
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('ShoppingCart', shoppingCart)