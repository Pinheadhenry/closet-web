const express = require("express")
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

const initializePassport = require('../passport-config')
initializePassport(
    passport, 
    async (emailInput) =>  {
        user = await User.find({ email: emailInput})
        return user[0]
    }
)

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router