const fs = require('fs')

module.exports = class ContainerProduct {
    constructor (container) {
        this.container = container
    }
    async save (objet) {
        try {
            if (fs.existsSync(this.container)){
                let information = await fs.promises.readFile(this.container, 'utf-8')
                let result = JSON.parse((information))
                if(result.length > 0){
                    let newId = result[result.length-1].id+1
                    let newProduct = {
                        id: newId,
                        ...objet
                    }
                    result.push(newProduct)
                    await fs.promises.writeFile(this.container, JSON.stringify(result, null,2))
                    return newId
                } else{
                    let newProduct = {
                        id: 1,
                        ...objet
                    }
                    result.push(newProduct)
                    await fs.promises.writeFile(this.container, JSON.stringify(result, null, 2))
                    return 1
                }
            } else {
                let newProduct = {
                    id:1,
                    ...objet
                }
                await fs.promises.writeFile(this.container, JSON.stringify([newProduct], null, 2))
                return 1
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getAll () {
        try {
            let information = await fs.promises.readFile(this.container,'utf-8')
            let result = JSON.parse(information)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById (id) {
        try {
            let result = await this.getAll()
            let deleteId = parseInt(id)
            let indice = result.findIndex(el => el.id == deleteId)
            
            if (indice != -1) {
                result.splice(indice, 1)
                await fs.promises.writeFile(this.container, JSON.stringify(result, null , 2))
                return deleteId
            } else {
                undefined           
            }
        } catch (error) {
            console.log(error)            
        }
    }
    async update (id, objet) {
        try {
            let result = await this.getAll()
            let deleteId = parseInt(id)
            let indice = result.findIndex(el => el.id == deleteId)
            if (indice != -1) {
                result[indice] = {id: deleteId, ...objet}
                await fs.promises.writeFile(this.container, JSON.stringify(result, null , 2))
            } else {
                undefined
            }

            
        } catch (error) {
            console.log(error)
        }
    }
}