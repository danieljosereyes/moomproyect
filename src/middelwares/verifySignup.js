const User = require('../models/User')

const duplicateEmail = async (req, res, next) => {
    const userFound = await User.findOne({email: req.body.email})

    if (userFound) return res.status(400).json({mensaje: "El Usuario ya existe"})

    next()
}

module.exports = {duplicateEmail}