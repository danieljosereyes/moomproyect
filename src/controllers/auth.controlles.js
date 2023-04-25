const User = require('../models/User')
const Roles = require('../models/Role')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')

const signUp = async (req, res) => {
    const { usuario, mobil, email, password, roles } = req.body

    const newUser = new User({
        usuario, 
        mobil, 
        email, 
        password: await User.encryptPassword(password)
    })

    if(roles) {
        const foundRoles = await Roles.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Roles.findOne({name: "user"})
        newUser.roles = [role._id]
    }

    const saveUser = await newUser.save()
    console.log(saveUser)

    const token = jwt.sign({id: saveUser._id}, SECRET, {
        expiresIn: 86400
    })
    
    res.status(200).json({token})
}



const signIn = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate('roles')

    if (!userFound) return res.status(400).json({mensaje: "Usuario no encontrado"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    
    if (!matchPassword) return res.status(401).json({token: null, mensaje: "Contraseña invalida"})
    
    const token = jwt.sign({id: userFound._id}, SECRET, {
        expiresIn: 86400
    })

    res.json({token})
}

const logout = (req, res, next) => {
    if (req.user) req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
}

module.exports = {
    signUp,
    signIn,
    logout
}