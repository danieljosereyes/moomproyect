const Chat = require('./models/Chat')

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Usuario conectado');
        const emitChat = async () => {
            const chat = await Chat.find()
            io.emit('cargarChat', chat)
        }
        emitChat()
        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
          });
      });
}