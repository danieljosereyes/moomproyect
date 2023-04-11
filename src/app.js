const express = require('express');
const morgan = require("morgan");
const app = express();
const path = require('path')
const { createRoles } = require('./libs/initialSetup')
createRoles()
require('./strategies/facebookStrategy')

const session = require('express-session')
const passport = require('passport')

app.use(morgan('dev'));


//Unlecoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion Public
const publicRoot = 'public';
app.use(express.static(publicRoot));

//Configuracion views
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Middelwares
app.use(session({
    secret: 'Esto es secreto',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
const index = require('./routes/index.routes.js')
const dashboard = require('./routes/dashboard.routes.js')
const apiInfo = require('./routes/info.js')
const apiProduct = require('./routes/products.routes.js')
const apiAuthRoutes = require('./routes/auth.routes.js')
// const apiRandoms = require('./routes/randoms.js')

app.use('/', index)
app.use('/dashboard', dashboard)
app.use('/api/info', apiInfo)
app.use('/api/products', apiProduct)
app.use('/auth', apiAuthRoutes)

//Global

module.exports = app