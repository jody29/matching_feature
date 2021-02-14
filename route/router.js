const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function (req, res) {
    res.render('pages/index', {
        title: 'Home',
        currentHome: 'current',
        currentProfile: 'none',
        currentPreference: 'none'
        
    })
})

router.get('/profile', function (req, res) {
    res.render('pages/profile', {
        title: 'Profile',
        currentProfile: 'current',
        currentHome: 'none',
        currentPreference: 'none'
    })
})


router.get('*', function (req, res) {
    res.status(404).render('pages/404', {
        url: req.url,
        title: 'Error 404',
        currentPreference: 'none',
        currentProfile: 'none',
        currentHome: 'none'
    })
})

module.exports = router;