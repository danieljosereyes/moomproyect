const { Router } = require('express')
const router = Router()

const { signUp, signIn } = require('../controllers/auth.controlles')
const { duplicateEmail } = require('../middelwares')

router.post('/signup', duplicateEmail, signUp)
router.post('/signin', signIn)

module.exports = router