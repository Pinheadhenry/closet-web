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
    },
    async (idInput) => {
        return await User.findById(idInput)
    }
)

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next() 
}

module.exports = router