const { Router } = require('express')
const router = Router()
const passport = require('passport')

const { isNotAuthorized, isAuthrized } =require('../util/auth')

const { signUp, signIn } = require('../controllers/auth.controlles')
const { duplicateEmail } = require('../middelwares')

router.get('/login/facebook', isNotAuthorized,passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}))


router.get('/logout', isAuthrized, (req, res, next) => {
    if (req.user) req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

router.post('/signup', duplicateEmail, signUp)
router.post('/signin', signIn)

module.exports = router