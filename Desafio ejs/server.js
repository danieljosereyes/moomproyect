const express = require('express')
const Productos = require('./memory/constructor.js')

const contenedor =  new Productos ('productos.txt')

const app = express()

const PORT = 8080

//Unlecoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//carpeta public
app.use(express.static(__dirname + '/public'))
//carpeta views
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('formulario', {}) 
});
//Render Formulario
app.post('/productos', async (req, res) => {
    const arrayBody = req.body
    const id = await contenedor.save(arrayBody)
    res.render('formulario', {}) 
})
//render Lista
app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll()
    res.render('lista', {
        productos
    }) 
});

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando: ${server.address().port}`)
})

server.on('error', error => console.log(`Error ${error}`))