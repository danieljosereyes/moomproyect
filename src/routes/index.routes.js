const { Router } = require('express')
const { isNotAuthorized } = require('../util/auth')
const router = Router()

router.get('/', isNotAuthorized,(req, res) => {
    res.render("pages/home")
})

module.exports = router