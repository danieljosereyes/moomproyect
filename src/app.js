const express = require('express');
const morgan = require("morgan");
const MongoStore = require('connect-mongo')
const { MONGODB_URI, SECRET } = require('./config');

const app = express();
require('./strategies/facebookStrategy')

const path = require('path')
const { createRoles } = require('./libs/initialSetup')
createRoles()

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
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGODB_URI
    }),
    cookie: {
        maxAge: 6000 * 1 
    }
}))
app.use(passport.initialize())
app.use(passport.session())

//Global
app.use((req, res, next) => {
    app.locals.user = req.user
    next()
})
// Routes
const index = require('./routes/index.routes.js')
const dashboard = require('./routes/dashboard.routes.js')
const apiInfo = require('./routes/info.js')
const apiProduct = require('./routes/products.routes.js')
const apiAuthRoutes = require('./routes/auth.routes.js');

// const apiRandoms = require('./routes/randoms.js')

app.use('/', index)
app.use('/dashboard', dashboard)
app.use('/api/info', apiInfo)
app.use('/api/products', apiProduct)
app.use('/auth', apiAuthRoutes)


module.exports = app