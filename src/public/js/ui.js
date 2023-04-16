import { guardarMensaje, deleteMensaje, getMensajeById, updateChat } from "./socket.js"

const listaMensajes = document.querySelector('#chat')
const email = document.querySelector('#email')
const tipo = document.querySelector('#tipo')
const mensaje = document.querySelector('#mensaje')

let guardarId = ''

const mensajesUi = (mensaje) => {
    const div = document.createElement('div')
    div.innerHTML = `
            <div>
                <h1>${mensaje.email}</h1>
                <p>${mensaje.tipo}</p>
                <p>${mensaje.mensaje}</p>
                <div>
                    <button class='delete' data-id='${mensaje._id}'>eliminar</button>
                    <button class='update' data-id='${mensaje._id}'>editar</button>
                </div>
            </div>
    `
    const btnDelete = div.querySelector('.delete')
    const btnUpdate = div.querySelector('.update')

    btnDelete.addEventListener('click', e => deleteMensaje(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getMensajeById(btnUpdate.dataset.id))
    

    return div
}


export const renderChat = (mensajes) => {
    listaMensajes.innerHTML = ``
    mensajes.forEach(mensaje =>  listaMensajes.append(mensajesUi(mensaje)));
}

export const llenarFormulario = (formulario) => {
    email.value = formulario.email
    tipo.value = formulario.tipo
    mensaje.value = formulario.mensaje
    guardarId = formulario._id
}

export const onHandleSubmit = (e) => {
    e.preventDefault()

    if (guardarId) {
        updateChat(guardarId, email.value, tipo.value, mensaje.value)
    } else {
        guardarMensaje(
            email.value,
            tipo.value,
            mensaje.value
        )
    }

    guardarId = ''
    email.value = ''
    tipo.value = ''
    mensaje.value = ''

}

export const appendMensaje = (mensaje) => {
    listaMensajes.append(mensajesUi(mensaje))
}

