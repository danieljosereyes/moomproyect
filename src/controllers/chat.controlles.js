const getChat = (req, res) => {
    console.log(req.user)
    // const email = req.user.emails[0].value
    res.render('pages/chat')
}

module.exports = {
    getChat
}