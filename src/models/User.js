const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    usuario: {
        type: String,
    },
    mobil: {
        type: Number,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: [{
        ref: "Roles",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

UserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = model('Users', UserSchema)