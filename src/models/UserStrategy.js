const {Schema, model} = require('mongoose')


const UserStrategySchema = new Schema({
    facebookId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    }, {
    timestamps: true,
})

module.exports = model('UsersStrategy', UserStrategySchema)