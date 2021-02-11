const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function (req, res) {
    res.render('pages/index', {
        title: 'Home'
    })
})

router.get('/profile', function (req, res) {
    res.render('pages/profile', {
        title: 'Profile'
    })
})

router.get('*', function (req, res) {
    res.status(404).render('pages/404', {
        url: req.url,
        title: 'Error 404'
    })
})

module.exports = router;