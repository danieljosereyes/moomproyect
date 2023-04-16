const { Router } = require('express')
const router = Router()
const  { isAuthrized } = require('../util/auth')

router.get('/', isAuthrized, (req, res) => {
    try {
        res.render('pages/dashboard')
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router