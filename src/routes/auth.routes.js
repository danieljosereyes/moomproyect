const { Router } = require('express')
const router = Router()
const passport = require('passport')

const { signUp, signIn } = require('../controllers/auth.controlles')
const { duplicateEmail } = require('../middelwares')

router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}))
router.post('/signup', duplicateEmail, signUp)
router.post('/signin', signIn)

module.exports = router