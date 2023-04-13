const { Router } = require('express')
const router = Router()
const { getChat } = require('../controllers/chat.controlles')

router.get("/", getChat)

module.exports = router