const fs = require('fs')
const shoppingCart = require('../routes/ShoppingCart')

module.exports = class ShoppingCart {
    constructor (cart) {
        this.cart = cart
    }
    //Crea la estructura de carrito
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
                        productos: []
                    }
                    result.push(newShoppingCart)
                    await fs.promises.writeFile(this.cart, JSON.stringify(result, null, 2))
                    return newId
                } else {
                    let newShoppingCart = {
                        id: 1,
                        timestamp: Date.now(),
                        productos: []
                    }
                    result.push(newShoppingCart)
                    await fs.promises.writeFile(this.cart, JSON.stringify(newShoppingCart, null, 2))
                    return 1
                }
            } else{
                let newShoppingCart = {
                    id: 1,
                    timestamp: Date.now(),
                    productos: []
                }
                await fs.promises.writeFile(this.cart, JSON.stringify([newShoppingCart], null, 2))
                return 1
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Guarda un produto si encuetra un id carrito.
    //Si no encuentra un carrito, creara uno y agregara el objeto
    async saveIdShoppingCart (id_prod, objet) {
        try {
            let result = await this.getAll()
            let index = result.findIndex(el => el.id == id_prod)
            if (index != -1) {
                result[index].productos.push(objet)
                await fs.promises.writeFile(this.cart, JSON.stringify(result, null, 2))
                return objet
            } else {
                console.log(objet)
                let newShoppingCart = {
                    id: 1,
                    timestamp: Date.now(),
                    productos: [objet]
                }
                await fs.promises.writeFile(this.cart, JSON.stringify([newShoppingCart], null, 2))
                return objet
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Obtiene el array de carrito
    async getAll () {
        try {
            let information = await fs.promises.readFile(this.cart,'utf-8')
            let result = JSON.parse(information)
            
            return result
        } catch (error) {
            console.log(error)
        }
    }
    //Vacia el carrito por id y lo elimina 
    async deleteById (id) {
        try {
            let result = await this.getAll()
            let index = result.findIndex(el => el.id == id)
            if (index != -1) {
                result.splice(index, 1)
                await fs.promises.writeFile(this.cart, JSON.stringify(result, null , 2))
                return id
            } else {
                console.log('Carrito no encontrado')      
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Lista todos los productos guardados en ek carrito
    async getProductCartById (id) {
        try {
            let result = await this.getAll()
            let index = result.findIndex(el => el.id == id)
            if (index != -1) {
                return result[index].productos
            } else {
                console.log('Carrito no encontrado')
                return "carrito no encontrado"
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Elimina producto del carrito por id de producto y del carrito
    async deleteProductById (idCart, idProduct) {
        try {            
            let result = await this.getAll()
            let index = result.findIndex(el => el.id == idCart)
            if (index != -1) {
                let product = result[index].productos
                let indexProduct = product.findIndex(el => el.id == idProduct)
                if (indexProduct != -1) {
                    result[index].productos.splice(indexProduct, 1)
                    await fs.promises.writeFile(this.cart, JSON.stringify(result, null, 2))
                    return idProduct
                } else {
                    console.log('Producto no encontrado')
                    return false
                }
            } else {
                console.log('Carrito no encontrado')
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }
}