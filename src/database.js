const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://rooteado:YXhF8AC7AKYzPEI5@cluster0.i7qjgjd.mongodb.net/moomproyect?retryWrites=true&w=majority")
    .then(db => console.log('db is connected'))
    .catch(error => console.log(error))