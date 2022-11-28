const fs = require('fs')

module.exports = class ShoppingCart {
    constructor (cart) {
        this.cart = cart
    }
    
    async save (objet) {
        try {
            if (fs.existsSync(this.cart)) {
                let information = await fs.promises.readFile(this.cart, 'utf-8')
                let result = JSON.parse((information))
                if(result.length > 0){
                    let newId = result[result.length-1].id+1
                    let newShoppingCart = {
                        id: newId,
                        timestamp: Date.now(),
                        productos: [{...objet}]
                    }
                    result.push(newShoppingCart)
                    await fs.promises.writeFile(this.cart, JSON.stringify(result, null, 2))
                    return newId
                } else {
                    let newShoppingCart = {
                        id: 1,
                        timestamp: Date.now(),
                        productos: [{...objet}]
                    }
                    result.push(newShoppingCart)
                    await fs.promises.writeFile(this.cart, JSON.stringify([newShoppingCart], null, 2))
                    return 1
                }
            } else{
                let newShoppingCart = {
                    id: 1,
                    timestamp: Date.now(),
                    productos: [{...objet}]
                }
                await fs.promises.writeFile(this.cart, JSON.stringify([newShoppingCart], null, 2))
                return 1
            }
        } catch (error) {
            console.log(error)
        }
    }
    async saveIdShoppingCart (id, objet) {
        try {
            let result = await this.getAll()
            let index = result.findIndex(el => el.id == id)
            if (index != -1) {
                let product = result[index].productos
                let idProduct = product[product.length-1].id+1
                
                let newProduct = {
                    id: idProduct,
                    ...objet
                }
                result[index].productos.push(newProduct)
                await fs.promises.writeFile(this.cart, JSON.stringify(result, null, 2))
                return idProduct
            } else {
                console.log('Carrito no encontrado')     
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProductById (idCart, idProduct) {
        try {            
            let result = await this.getAll()
            let index = result.findIndex(el => el.id == idCart)
            if (index != -1) {
                let product = result[index].productos
                let indexProduct = product.findIndex(el => el.id == idProduct)
                console.log(idProduct)
                if (indexProduct != -1) {
                    result[index].productos.splice(indexProduct, 1)
                    await fs.promises.writeFile(this.cart, JSON.stringify(result, null, 2))
                    return idProduct
                } else {
                    console.log('Producto no encontrado')
                }
            } else {
                console.log('Carrito no encontrado')
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getAll () {
        try {
            let information = await fs.promises.readFile(this.cart,'utf-8')
            let result = JSON.parse(information)
            
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById (id) {
        try {
            let result = await this.getAll()
            let index = result.findIndex(el => el.id == id)
            if (index != -1) {
                result.splice(indice, 1)
                await fs.promises.writeFile(this.cart, JSON.stringify(result, null , 2))
                return id
            } else {
                console.log('Carrito no encontrado')      
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getProductCartById (id) {
        try {
            let result = await this.getAll()
            let getById = parseInt(id)
            let index = result.findIndex(el => el.id == getById)
            if (index != -1) {
                return result[index].productos
            } else {
                console.log('Carrito no encontrado')
            }
        } catch (error) {
            console.log(error)
        }
    }
}