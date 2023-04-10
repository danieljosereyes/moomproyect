require('dotenv').config()



module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET: 'product-api',
    PORT: process.env.PORT || 8080
}