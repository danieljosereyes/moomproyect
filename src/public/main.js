import { cargarChat } from "./js/socket.js"
import { onHandleSubmit } from "./js/ui.js"

cargarChat()

const formularioChat = document.querySelector('#formularioChat')
formularioChat.addEventListener('submit', onHandleSubmit)