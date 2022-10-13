class User {
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre
		this.apellido = apellido
		this.libros = libros
		this.mascotas = mascotas
	}

	getFullName() {
		return console.log(`Nombre completo: ${this.nombre} ${this.apellido}`)
	}

	addMascota(mascota) {
		this.mascotas.push(mascota)
	}

	countMascotas() {
		this.mascotas.length > 0 ? console.log(`Cantidad de mascotas: ${this.mascotas.length}`) : console.log('No tiene mascotas')
	}

	addBook(name, author) {
		this.libros.push({nameBook: name, authorName: author})
	}

	getBookName() {
		const arrayNameBook = this.libros.map((el) => el.nameBook )
		arrayNameBook.length > 0 ? console.log( `Libros leidos ${arrayNameBook}`) : console.log(`No lee libros`)
	}


}
//Ejemplo usuario2
let usuario1 = new User('Daniel', 'Reyes', [], [])
//agregando mascotas y libros
usuario1.addMascota('Leon')
usuario1.addMascota('Puma')
usuario1.addBook('Padre Rico, Padre Pobre', "Robert Kiyosaki y Sharon Lechter")
usuario1.addBook('Vendedores Perros', "Blair Singer")
//mostrando resultados en la consola
console.log(usuario1)
usuario1.getFullName()
usuario1.countMascotas()
usuario1.getBookName()

//Ejemplo Usuario2
let usuario2 = new User('Admin', 'Ejemplo',[] ,[])
//mostrando resultados en la consola sin agregar mascotas y libros
console.log(usuario2)
usuario2.getFullName()
usuario2.countMascotas()
usuario2.getBookName()