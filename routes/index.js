const express = require("express")
const router = express.Router()

router.get('/', checkAuthenticated, async (req, res) => {
    const currentUser = await req.user
    res.render('index', { name: currentUser.username})
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}



module.exports = router