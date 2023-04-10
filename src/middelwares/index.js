const { verifyToken } = require('./authJwt')
const { duplicateEmail } = require('./verifySignup')

module.exports = {
    verifyToken,
    duplicateEmail
}