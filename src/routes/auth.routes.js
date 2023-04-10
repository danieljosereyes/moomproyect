const { Router } = require('express')
const router = Router()

const { signUp, signIn } = require('../controllers/auth.controlles')

router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router