const { Router } = require('express')
const router = Router()
const  { isAuthrized } = require('../util/auth')

router.get('/', isAuthrized, (req, res) => {
    
    res.render('pages/dashboard')
})

module.exports = router