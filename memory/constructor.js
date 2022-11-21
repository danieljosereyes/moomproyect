const fs = require('fs')
const { title } = require('process')
//exporto la clase
module.exports = class Productos {
    constructor (contenedor){
        this.contenedor = contenedor
    }
    //Metodo para crear el archivo
    save = async(productos) => {
        try {
            //genera el archivo
            if(fs.existsSync(this.contenedor)){
                let resultado = await this.getAll()
                if(resultado.length > 0) {
                    let idNuevo = resultado[resultado.length-1].id+1
                    let nuevoProducto = {
                        id: idNuevo,
                        ...productos
                        //Agrega un producto formulando un id.
                    }
                    resultado.push(nuevoProducto)
                    await fs.promises.writeFile(this.contenedor, JSON.stringify(resultado, null, 2))
                    //Retorna el id del objeto creado
                    return idNuevo
                }else{
                    //Agrega el primer producto con el primer id.
                    //Crea un nuevo producto si no hay productos en el archivo.
                    let nuevoProducto = {
                        id: 1,
                        ...productos
                    }
                    resultado.push(nuevoProducto)
                    await fs.promises.writeFile(this.contenedor, JSON.stringify(resultado, null, 2))
                    //Retorna el id del objeto creado
                    return 1
                }

            }else{
                let nuevoProducto = {
                    id: 1,
                    ...productos
                    //Agrega el primer producto con el primer id
                }
                //Crear el archivo productox.txt y agrega el primer producto.
                await fs.promises.writeFile(this.contenedor, JSON.stringify([nuevoProducto], null, 2))
                return 1
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    //Metodo para obtener el id
    getById = async (numberId) => {
        try {
            if(fs.existsSync(this.contenedor)){
                let resultado = await this.getAll()
                let resultadoPorId = resultado.find(el => el.id == numberId)
                return resultadoPorId
            }else{
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    //Metodo para obtener el array de productos
    getAll = async () => {
        try {
            if(fs.existsSync(this.contenedor)){
                let informacion = await fs.promises.readFile(this.contenedor, 'utf-8')
                let resultado = JSON.parse(informacion)
                //Return array
                return await resultado
            }
        } catch (error) {
            console.log(error)
        }
    }
    //metodo para actualizar el producto por id
    update = async (productos, id) => {
        try {
            if(fs.existsSync(this.contenedor)){
                let resultado = await this.getAll()
                if(resultado.some(el => el.id == id)){

                    let elemtoId = resultado.findIndex(el => el.id == id)
                    resultado.splice(elemtoId, 1)
                    let nuevoProducto = {
                        id: id,
                        ...productos
                    }
                    resultado.push(nuevoProducto)
                    await fs.promises.writeFile(this.contenedor, JSON.stringify(resultado, null, 2))
                    return await nuevoProducto
                }else{
                    console.log('No se encontro el archivo a eliminar')
                    return null
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Metodo para eliminar el producto por id
    deleteById = async (numberId) => {
        try {
            if(fs.existsSync(this.contenedor)){
                let resultado = await this.getAll()

                //Se confirma si existe el objeto en el array
                if(resultado.some(el => el.id == numberId)){
                    //elementoId obtiene el indice del objeto a eliminar
                    let elemtoId = resultado.findIndex(el => el.id == numberId)
                    resultado.splice(elemtoId, 1)
                    await fs.promises.writeFile(this.contenedor, JSON.stringify(resultado, null, 2))
                }else{
                    console.log('No se encontro el archivo a eliminar')
                    return null
                }
                
            }else{
                console.log('Archivo no encontrado')
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () => {
        try {
            if(fs.existsSync(this.contenedor)){
            //Elimina todos los Objetos precentes en el archivo
            await fs.promises.writeFile(this.contenedor, JSON.stringify([]))
            return undefined
            }else{
                console.log('No existe archivo alguno')
            }
        } catch (error) {
            console.log(error)
        }
    }

}