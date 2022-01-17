const express = require("express")
const router = express.Router()
const User = require('../models/user')
const bcyrpt = require('bcrypt')

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcyrpt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const newUser = await user.save()
        res.redirect('/login')
    } catch (err) {
        res.redirect('/register')
    }
    const users = await User.find({})
    console.log(users)
})

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next() 
}


module.exports = router