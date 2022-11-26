const Product = require('./container/containerProduct.js')

const dbProduct = new Product('./db/product.txt')

const prueba =  async() => {
    console.log(await dbProduct.getAll())
}
prueba()