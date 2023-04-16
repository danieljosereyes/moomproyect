import { cargarChat, enGuardarMensaje, mensajeSelecionado } from "./js/socket.js"
import { onHandleSubmit, renderChat, appendMensaje, llenarFormulario } from "./js/ui.js"

enGuardarMensaje(appendMensaje)
cargarChat(renderChat)
mensajeSelecionado(llenarFormulario)

const formularioChat = document.querySelector('#formularioChat')
formularioChat.addEventListener('submit', onHandleSubmit)