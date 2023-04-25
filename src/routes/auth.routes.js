const { Router } = require('express')
const router = Router()
const passport = require('passport')

const { isNotAuthorized, isAuthrized } =require('../util/auth')

const { signUp, signIn, logout } = require('../controllers/auth.controlles')
const { duplicateEmail } = require('../middelwares')

router.get('/logout', isAuthrized, logout);

router.post('/signup', duplicateEmail, signUp)

router.post('/signin', signIn)

router.get('/login/facebook', isNotAuthorized, passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}))

module.exports = router