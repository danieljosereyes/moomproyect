const express = require('express')
const Productos = require('./memory/constructor.js')
/* const { Router } = express */


const contenedor =  new Productos ('productos.txt')

const app = express()

const PORT = 8080

/* const productos = Router() */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//carpeta public
//app.use('/static', express.static(__dirname + ('/public')))
app.use(express.static(__dirname + '/public'))

//carpeta views
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('formulario', {}) 
});

app.post('/productos', async (req, res) => {
    const arrayBody = req.body
    await contenedor.save(arrayBody)
    res.render('formulario', {}) 
})


app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll()
    res.render('lista', {
        productos
    }) 
});
//devuelve el producto por id
/* productos.get('/:id', async(req, res) => {
    const number = parseInt(req.params.id)
    const getById = await contenedor.getById(number)
    if(getById == null){
        res.json({error: 'Producto no encontrado'})
    }else{
        res.json(getById);
    }
}) */
//agrega un producto por body y lo muestra
/* productos.post('/', async(req, res) => {
    const arrayBody = req.body
    const id = await contenedor.save(arrayBody)
    res.json({
        id: id,
        ...arrayBody
    })
}); */

//actualiza producto por id y lo muestra
/* productos.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const arrayBody = req.body

    let result = await contenedor.update(arrayBody, id)

    res.json({ result })
}) */


//elimina un producto por id
/* productos.delete('/:id', async(req, res) => {
    const number = parseInt(req.params.id)
    const status = await contenedor.deleteById(number)
    if(status == null){
        res.json({status: 'eliminado'});
    }
}) */
//router productos
/* app.use('/api/productos', productos) */

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando: ${server.address().port}`)
})

server.on('error', error => console.log(`Error ${error}`))