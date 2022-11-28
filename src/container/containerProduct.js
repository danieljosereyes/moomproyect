const fs = require('fs')

module.exports = class ContainerProduct {
    constructor (container) {
        this.container = container
    }
    //Crea el archivo de texto
    async save (objet) {
        try {
            if (fs.existsSync(this.container)){
                let information = await fs.promises.readFile(this.container, 'utf-8')
                let result = JSON.parse(information)
                if(result.length > 0){
                    let newId = result[result.length-1].id+1
                    let newProduct = {
                        id: newId,
                        timestamp: Date.now(),
                        ...objet
                    }
                    result.push(newProduct)
                    await fs.promises.writeFile(this.container, JSON.stringify(result, null, 2))
                    return newId
                } else{
                    let newProduct = {
                        id: 1,
                        timestamp: Date.now(),
                        ...objet
                    }
                    result.push(newProduct)
                    await fs.promises.writeFile(this.container, JSON.stringify(result, null, 2))
                    return 1
                }
            } else {
                let newProduct = {
                    id: 1,
                    timestamp: Date.now(),
                    ...objet
                }
                await fs.promises.writeFile(this.container, JSON.stringify([newProduct], null, 2))
                return 1
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Obtiene el array de productos
    async getAll () {
        try {
            let information = await fs.promises.readFile(this.container,'utf-8')
            let result = JSON.parse(information)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id) {
        try {
            let result = await this.getAll()
            let indice = result.findIndex(el => el.id == id)
            if (indice != -1) {
                return result[indice]
            } else {
                console.log("Producto no encontrado")
                return undefined
            }
        } catch (error) {
            
        }
    }
    //Eliminar producto por id
    async deleteById (id) {
        try {
            let result = await this.getAll()
            let indice = result.findIndex(el => el.id == id)
            
            if (indice != -1) {
                result.splice(indice, 1)
                await fs.promises.writeFile(this.container, JSON.stringify(result, null , 2))
                return id
            } else {
                return undefined           
            }
        } catch (error) {
            console.log(error)            
        }
    }
    //Actualiza producto por id
    async update (id, objet) {
        try {
            let result = await this.getAll()
            let indice = result.findIndex(el => el.id == id)
            if (indice != -1) {
                result[indice] = {id: id, timestamp: Date.now(), ...objet}
                await fs.promises.writeFile(this.container, JSON.stringify(result, null , 2))
                return objet
            } else {
                undefined
            }
        } catch (error) {
            console.log(error)
        }
    }
}