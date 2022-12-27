const socket = io();


function renderProducto(producto) {
    const linea = document.createElement('ul');
    linea.setAttribute("class", "Lista__Ordenada")
    //Titulo
    const titulo = document.createElement('li');
    titulo.innerHTML = producto.title;
    linea.appendChild(titulo);
  
    //precio
    const precio = document.createElement('li');
    precio.innerHTML = producto.price;
    linea.appendChild(precio);
  
    //Foto
    const foto = document.createElement('div');
    foto.setAttribute("class", "Lista__Ordenada div")
    const img = document.createElement('img');
    img.setAttribute("src", producto.thumbnail);
    img.setAttribute("width", "25");
  
    foto.appendChild(img);
    linea.appendChild(foto);
  
    document.getElementById('lista').appendChild(linea);
}

socket.on('new-connection', async data => {
    await data.forEach(producto => {
      renderProducto(producto);
    });
  });
  
  socket.on('product', data => {
    renderProducto(data);
  });

function addProduct(e) {
    const producto = {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      thumbnail: document.getElementById("thumbnail").value
    };
    socket.emit('new-product', producto);
    return false;
  }

//mensajes
function render (data) {
  console.log(data)
  const html = data.map((el, index) => {
    return(`<div>
              <p><strong>${el.author.id}</strong> [${el.time}]:</p>
              <em>${el.texto}</em>
            </div>`)
  }).join(" ")
    document.getElementById("mensajes").innerHTML = html
}

socket.on('mensajes', function(data) { render(data) })

const formEnviarMensaje = document.getElementById("formEnviarMensaje")
formEnviarMensaje.addEventListener('submit', e => {
  e.preventDefault()
  
  const mensaje = {
    author: {
      id: inputId.value,
      nombre: inputNombre.value,
      apellido: inputApellido.value,
      edad: inputEdad.value,
      alias: inputAlias.value,
      avatar: inputAvatar.value,
  
    },
    texto: inputMensaje.value
  }
  console.log(mensaje)
  if(mensaje.author.id) {
    socket.emit('nuevo-mensaje', mensaje)
  }else{
    alert('Ingrese usuario')
  }
  return false;


})

function addMensaje (e) {
  const mensaje = {
    author: {
      id: document.getElementById("id").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
  
    },
    texto: document.getElementById("texto").value
  }
  if(mensaje.user) {
    socket.emit('nuevo-mensaje', mensaje)
  }else{
    alert('Ingrese usuario')
  }
  return false;
}