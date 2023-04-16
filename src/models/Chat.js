const { Schema, model } = require('mongoose')

const ChatSchema = new Schema ({
    email: String,
    tipo: String,
    mensaje: String
}, {
    timestamps: true
})

module.exports = model('Chat', ChatSchema)