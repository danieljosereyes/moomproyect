const isAuthrized = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect("/")
    }
}

const isNotAuthorized = (req, res, next) => {
    if (req.user) {
        res.redirect("/dashboard")
    } else {
        next()
    }
}

module.exports = {
    isAuthrized,
    isNotAuthorized
}