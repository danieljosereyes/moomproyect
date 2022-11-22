//Require
const express = require('express')
const { Server: HttpServer } = require('http')
const moment = require('moment/moment.js')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


//export contructor productos
const Productos = require('./container/constructor.js')
const contenedor =  new Productos ('./src/db/productos.txt')
const mensajes = new Productos ('./src/db/mensajes.txt')

//puerto y rutas
const PORT = 8080
const publicRoot = './public'

//Unlecoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//carpeta public
app.use(express.static(publicRoot));


//render index ejs 
app.get('/', (req, res) => {
    res.send("index.html", { root: publicRoot } )
});

//Servidor
const server = httpServer.listen(PORT, () => {
    console.log(`servidor escuchando: ${server.address().port}`)
})

server.on('error', error => console.log(`Error: ${error}`))

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
    socket.emit('mensajes', listMensajes)

    socket.on('nuevo-mensaje', async data => {
        data.time = moment(new Date()).format('DD/MM/YYY hh:mm:ss')
        await mensajes.save(data)
        const listMensajes = await mensajes.getAll()
        io.sockets.emit('mensajes', listMensajes)
    })
})