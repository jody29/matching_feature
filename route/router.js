const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const db = require('../model/db')
const dbName = process.env.DB_NAME
const collectionName = 'users'


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
        currentPreference: 'none',
        games: req.body.games,
        consoles: req.body.chosenConsoles


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



router.post('/partials/preferenceForm', (req, res) => {

    const userBody = req.body
    const games = req.body.games
    const consoles = req.body.chosenConsoles

    db.initialize(dbName, collectionName, function(dbCollection) {
        dbCollection.insertOne(userBody, (error, result) => {
            if (error) throw error
        })
    })
    
    
    console.log(`games: ${games} \nconsoles: ${consoles}`)
    
    res.render('./pages/profile', {
        title: 'profile',
        currentPreference: 'none',
        currentProfile: 'none',
        currentHome: 'none',
        games: games,
        consoles: consoles
    })
 })


module.exports = router;