const app = require("./app.js")

require('./database.js')

const { PORT }= require('./config')
require('./strategies/facebookStrategy')

// const express = require('express')
const session = require('express-session')
//Require cookieParser
const cookieParser = require('cookie-parser')
//Require connect Mongo
const MongoStore = require('connect-mongo')
//Require File Session Store
const FileStore = require('session-file-store')(session)
//Require http
const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
//Require socket.Io
const { Server: IOServer } = require('socket.io')
const io = new IOServer(httpServer)
//Require moment
const moment = require('moment/moment.js')
//Require Normalizr
const { normalize, schema } = require("normalizr");
//Require Passpprt
const passport = require('passport')
const { Strategy: LocalStrategy} = require('passport-local')
//Require Facebook
// const { Strategy: FacebookStrategy} = require('passport-facebook')
//Require jsonwebtoken
const jwt = require('jsonwebtoken')
//cluster
const cluster = require('cluster')
//os
const os = require('os')


const procesadores = os.cpus().length










const PRIVATE_KEY = 'sdf#R"#$&/(/('

// const yargs = require("yargs")(process.argv.slice(2));




// args//
// const { puerto, _ } = yargs
// .alias({
//   p: 'puerto'
// })
// .default({
//   puerto: 8080
// })
// .argv;

// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
// app.use(cookieParser())
// app.use(
//     session({
//     // store: MongoStore.create({
//     //     mongoUrl: 'mongodb+srv://rooteado:YXhF8AC7AKYzPEI5@cluster0.i7qjgjd.mongodb.net/session?retryWrites=true&w=majority',
//     //     mongoOptions: advancedOptions,
//     //     ttl: 10 * 60
//     // }),

//     // store: new FileStore({path: './sessiones', ttl: 30000, retries: 0}),

//     secret: 'secreto',
//     resave: false,
//     saveUninitialized: false,
    
// }
// ))


//export contructor productos
const Productos = require('./container/constructor.js')


const contenedor =  new Productos ('./src/db/productos.txt')
const mensajes = new Productos ('./src/db/mensajes.txt')

// //Carpeta views ejs
// app.set('view engine', 'ejs')

//puerto y rutas
// const PORT = puerto
// const PORT = process.argv[2] || 8080






//usuarios en memoria
let usuarios = []

//Configurar funciones passport
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, ( req, username, password, done) => {
    const {direccion} = req.body
    const usuario =  usuarios.find((usuario) => usuario.username == username)
    if(usuario) {
        return done(null, false)
    }
    const user = { username, password, direccion }
    usuarios.push(user)

    const access_token = generateToken(user)

    return done(null, access_token)
}
))

// passport.use('login', new LocalStrategy(( username, password, done ) => {
//     const usuario = usuarios.find((usuario) => usuario.username == username && usuario.password == password)
//     if(!usuario){
//         return done(null, false)
//     }

//     usuario.contador = 0
//     return done(null, usuario)
// }))

//Credenciales 
const FACEOBOOK_CLIENT_ID = '1505181936633231'
const FACEOBOOK_CLIENT_SECRET = '5ec69e6ca06a87ddf0daed7a45fe4511'

// passport.use(new FacebookStrategy({
//     clientID: FACEOBOOK_CLIENT_ID,
//     clientSecret: FACEOBOOK_CLIENT_SECRET,
//     callbackURL: '/auth/facebook/callback',
//     profileFields: ['id', 'displayName', 'email'],
//     scope: ['email']
// }, (accessToken, refreshToken, userProfile, done) => {
//     return done(null, userProfile)
// }))

passport.serializeUser((user, done) => {
    done(null, user)
} )
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.use(passport.initialize())
app.use(passport.session())

//Endpoints Facebook

// app.get('/auth/facebook', passport.authenticate('facebook'))
// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/loginError'
// }))



//middelware jwt
const generateToken = (usuario) => {
    const token = jwt.sign({ data: usuario }, PRIVATE_KEY, {expiresIn: "10m"})
    return token
}


//Render


// app.get('/', (req, res) => {
//     if(req.isAuthenticated()){
//         res.redirect("/datos")
        
//     }else{
//         res.redirect("/login")

//     }
// })
app.get('/register', (req, res) => {
    res.render("pages/register")
})


app.post('/register', passport.authenticate('register', {failureRedirect: 'registerError', successRedirect: '/login'}))

app.get('/registerError', (req, res) => {
    res.render("pages/register-error")
})


// app.get('/login', (req, res) => {
//     res.render("pages/login")
// })

// app.post('/login' , passport.authenticate('login', { failureRedirect: '/loginError', successRedirect: '/datos'}))

app.get('/loginError', (req, res) => {
    res.render("pages/login-error")
})

app.get('/datos', (req, res) => {
    if (req.isAuthenticated()){
        res.render('pages/index', {
            nombre: req.user.username
        })
    }else{
        res.redirect('/login')
    }
})

// app.get('/logout', (req, res) => {
//     req.logout(() => {})
//     res.redirect('/')
// })




// pm2 start server.js --name:"Server1" --watch -- 8081
// pm2 start server.js --name:"Server2" --watch -- 8082




// if( cluster.isPrimary ) {
//     console.log(`Proceso maestro ${process.pid} trabajando`)

//     for (let i = 0; i < procesadores; i++) {
//         cluster.fork()
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Trabajador ${worker.process.pid} ha caido`)
//     })
// }else {  
//     app.use('/api/randoms', apiRandoms)
//     //Servidor
    const server = httpServer.listen(PORT, () => {
        console.log(`servidor escuchando: ${server.address().port}`)
    })
    
    server.on('error', error => console.log(`Error: ${error}`))

//     console.log(`Trabajador ${process.pid} comenzado`)
// }



//Socket
io.on('connection', async (socket) => {
    console.log('nuevo cliente conect')
    // lista formulario
    const lista = await contenedor.getAll()
    socket.emit('new-connection', lista)

    socket.on('new-product', async (data) => {
        await contenedor.save(data)
        io.sockets.emit("product", data)
    })



    //mensajeria
    const listMensajes = await mensajes.getAll()
    socket.emit('mensajes', await obtenerMensajesNormalizados())

    socket.on('nuevo-mensaje', async data => {
        data.time = moment(new Date()).format('DD/MM/YYY hh:mm:ss')
        await mensajes.save(data)

        // const listMensajes = await mensajes.getAll()
        io.sockets.emit('mensajes', await obtenerMensajesNormalizados())
    })
})

// -------------------------------------------
// Definicion de esquemas

const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new schema.Entity('post', {
    autor: autorSchema
}, { idAttribute: 'id' });

const mensajesSchema = new schema.Entity('posts', {
    mensajes: [mensajeSchema]
}, { idAttribute: 'id' });

// -------------------------------------------
// Funciones custom

const obtenerMensajesNormalizados = async () => {
    const arregloMensajes = await mensajes.getAll();
    return normalize({
        id: 'mensajes',
        mensajes: arregloMensajes,
    }, mensajesSchema);
};