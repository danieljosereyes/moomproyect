const socket = io()

export const cargarChat = () => {

    socket.on('cargarChat', (data) => {
        console.log(data)
    })
}
