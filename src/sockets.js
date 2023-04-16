const Chat = require('./models/Chat')

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Usuario conectado');
        const emitChat = async () => {
            const chat = await Chat.find()
            io.emit('server:cargarChat', chat)
        }

        emitChat()
        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
          });
        
        socket.on('client:guardarMensaje', async (data) => {
            
            const nuevoMensaje = new Chat(data)
            const guardarMensaje = await nuevoMensaje.save()
            
            
            io.emit('server:guardarMensaje', (guardarMensaje))
        })

        socket.on('client:deleteMensaje', async (id) => {
            await Chat.findByIdAndDelete(id)
            emitChat()
        })

        socket.on('client:getMensaje', async (id) => {
            const mensaje = await Chat.findById(id)
            io.emit('server:mensajeSelecionado', mensaje)
        })

        socket.on('client:updateChat', async (update) => {
            await Chat.findByIdAndUpdate(update._id, {
                tipo: update.tipo,
                mensaje: update.mensaje
            })
            emitChat()
        })
      });
}     