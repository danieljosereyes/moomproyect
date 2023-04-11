require('dotenv').config()

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET: process.env.SECRET || 'Esto es secreto',
    PORT: process.env.PORT || 8080,
    FACEOBOOK_CLIENT_ID: process.env.FACEOBOOK_CLIENT_ID,
    FACEOBOOK_CLIENT_SECRET: process.env.FACEOBOOK_CLIENT_SECRET
}