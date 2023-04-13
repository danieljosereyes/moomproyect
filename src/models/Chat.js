const { Schema, model } = require('mongoose')

const ChatSchema = new Schema ({
    email: {
        Type: String,
    },
    tipo: {
        Type: String
    },
    mensaje: {
        Type: String
    }
}, {
    timestamps: true
})

module.exports = model('Chat', ChatSchema)