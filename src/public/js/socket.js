const socket = io()

export const cargarChat = (callback) => {

    socket.on('server:cargarChat', callback)
}

export const guardarMensaje = (email, tipo, mensaje) => {
    socket.emit('client:guardarMensaje', {
        email,
        tipo,
        mensaje
    })
}

export const enGuardarMensaje = (callback) => {
    socket.on('server:guardarMensaje', callback)
}

export const deleteMensaje = (id) => {
    socket.emit('client:deleteMensaje', id)
}

export const getMensajeById = (id) => {
    socket.emit('client:getMensaje', id)
}
export const mensajeSelecionado = (callback) => {
    socket.on('server:mensajeSelecionado', callback)
}

export const updateChat = (id, email, tipo, mensaje) => {
    socket.emit('client:updateChat', {
        _id: id,
        email,
        tipo,
        mensaje
    })
}