const jwt = require('jsonwebtoken')
const User = require('../models/User')

const { SECRET } = require('../config')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if(!token) return res.status(403).json({mensaje: "No a proporcionado un token"})

        const decoded = jwt.verify(token, SECRET)

        const user = await User.findById(decoded.id)
        console.log(user)
        if(!user) return res.status(404).json({mensaje: "Usuario no encontrado"})

        next() 

    } catch (error) {
        return res.status(401).json({mensaje: "No autorizado"})
    }
}
module.exports = {verifyToken}