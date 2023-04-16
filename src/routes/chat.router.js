const { Router } = require('express')
const router = Router()
const { getChat } = require('../controllers/chat.controlles')
const { isAuthrized } =require('../util/auth')
router.get("/", isAuthrized, getChat)

module.exports = router