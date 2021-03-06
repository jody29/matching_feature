const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const db = require('../model/db')
const { ObjectID } = require('mongodb')
const dbName = process.env.DB_NAME
const collectionName = 'users'

// Initialize the database
db.initialize(dbName, collectionName, function(dbCollection) {

    router.get('/', function (req, res) {
    
        dbCollection.find().toArray().then(results => {
            res.render('pages/index', {
                users: results,
                title: 'Home',
                currentHome: 'current',
                currentProfile: 'none',
                currentPreference: 'none'
            })
        })

    })

    router.get('/users', function (req, res) {
   
       dbCollection.find().toArray().then(results => {
            res.render('pages/users', {
            user: results,
            title: 'Users',
            currentProfile: 'current',
            currentHome: 'none',
            currentPreference: 'none',
            })
       })   
    })

    router.post('/partials/addUserForm', function (req, res) {

        const newUser = req.body

        if (newUser !== '') {
            dbCollection.insertOne(newUser, (error, result) => {
                if (error) throw error
            })
        }  
        
        res.redirect('../users')
    })

    router.post('/updateUser', (req, res) => {
        const item = {
            username: req.body.username,
            chosenConsoles: req.body.chosenConsoles,
            games: req.body.games
        }

        const itemId = req.body.id
        

        dbCollection.findOneAndUpdate({ '_id': new ObjectID(itemId) }, { $set: item }, (error, result) => {
            if (error) throw error
        })

        res.redirect('../users')


    })


    router.post('/partials/preferenceForm', (req, res) => {

        const userBody = req.body
        const games = req.body.games
        const consoles = req.body.chosenConsoles

        dbCollection.insertOne(userBody, (error, result) => {
            if (error) throw error
        })
    
        console.log(`games: ${games} \nconsoles: ${consoles}`)
    
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

}, function(err) { // End of db initialize
    throw (err)
})


module.exports = router;