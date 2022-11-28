# 1ra entrega del Proyecto Final

## Archivo subido a glitch

[/api/productos](https://achieved-dynamic-author.glitch.me/api/productos)

### La prueba de funcionalidad de [/api/productos](https://achieved-dynamic-author.glitch.me/api/productos) esta testeada con postman

#### * Los metodos POST, PUT y DELETE esta disponible solo para administradores. 

```
Los metodos PUT y DELETE requieren parametros
EJEMPLO:
/api/productos/:id <= Parametro
```

#### * Puede agregar al header de postman la key: admin, value: true.
```
KEY: admin, 
VALUE: true.
```
#### * El metodo get esta disponible para usuarios y administradores

#### * Puede utilizar el siguiente objeto para agregar productos a la [/api/productos](https://achieved-dynamic-author.glitch.me/api/productos)

```
{
    "nombre": "Balon de Futbol",
    "descripcion": "Balon de futbol para jugar futbol",
    "codigo": 4161,
    "foto": "https://cdn4.iconfinder.com/data/icons/sports-flat-2/48/Football-64.png",
    "precio": 10,
    "stock": 3
}
```  

## La prueba de funcionalidad de [/api/carrito](https://achieved-dynamic-author.glitch.me/api/carrito) esta testeada con postman

[/api/carrito](https://achieved-dynamic-author.glitch.me/api/carrito)

### * Todos los metodos estan disponibles para usuarios y administradores

```
Los metodos son
//Crea el carrito de compras
GET//api/carrito

//elimina el carrito completo por id
DELETE//api/carrito/:id <=parametro

//Obtiene el Carrito de productos
GET//api/carrito/:id/productos  <=parametro

//agrega un producto por el id indicado
POST//api/carrito/:id/productos <=parametro

//Ubica el carrito por id y le elimina un producto encontrado
DELETE//api/carrito/:id/productos/:id <=parametro
```