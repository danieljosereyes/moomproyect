const express = require('express');
const morgan = require("morgan");
const app = express();

const { createRoles } = require('./libs/initialSetup')
createRoles()


//Unlecoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//carpeta public
const publicRoot = 'public';
app.use(express.static(publicRoot));

app.use(morgan('dev'));

// api Routes
const apiInfo = require('./routes/info.js')
const apiProduct = require('./routes/products.routes.js')
const apiAuthRoutes = require('./routes/auth.routes.js')
// const apiRandoms = require('./routes/randoms.js')

app.use('/api/info', apiInfo)
app.use('/api/products', apiProduct)
app.use('/api/auth', apiAuthRoutes)


module.exports = app