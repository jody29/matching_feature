const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

// Database variabels
const db = require('../model/db')
const { ObjectID } = require('mongodb')
const { ENOTEMPTY } = require('constants')
const dbName = process.env.DB_NAME
const collectionName = 'users'

db.initialize(dbName, collectionName, function(dbCollection) { // Initialize the database
    
    router.get('/', function (req, res) { // Home page
        
        dbCollection.find().toArray().then(results => { // Get all data from database
            res.render('pages/index', { // Render home page
                users: results,
                title: 'Home',
                currentHome: 'current',
                currentProfile: 'none',
                currentPreference: 'none'
            })
        })

    })

    router.get('/users', function (req, res) { // Users page
   
       dbCollection.find().toArray().then(results => { // Get all data from database
            res.render('pages/users', { // Render user page
            user: results,
            title: 'Users',
            currentProfile: 'current',
            currentHome: 'none',
            currentPreference: 'none',
            })
       })   
    })

    router.post('/partials/addUserForm', function (req, res) { // Post request for add user

        const newUser = req.body // Request the body of the filled in data

        
        dbCollection.insertOne(newUser, (error, result) => {
                if (error) throw error
        })
      
        
        res.redirect('../users')
    })

    router.post('/updateUser', (req, res) => {
        const games = req.body.games

        const lowerGames = games.toLowerCase()

        const item = {
            username: req.body.username,
            chosenConsoles: req.body.chosenConsoles,
            games: lowerGames
        }

        const itemId = req.body.id
        

        dbCollection.findOneAndUpdate({ '_id': new ObjectID(itemId) }, { $set: item }, (error, result) => {
            if (error) throw error
        })

        res.redirect('../users')


    })

    const sameConsole = (console, prefConsole) => {
        return console === prefConsole
    }

    const sameGame = (game, prefGame) => {
        return game === prefGame
    }

    // PREFERENCE FORM
    router.post('/partials/preferenceForm', (req, res) => {
        
        dbCollection.find().toArray(function(err, result) {
            if (err) throw err
            let data = result

            const games = req.body.games
            const consoles = req.body.chosenConsoles

            const lowerGames = games.toLowerCase() // games string to lower case for validation
            
            const resultData = data.filter((user) => sameConsole(user.chosenConsoles, consoles) && sameGame(user.games, lowerGames)) 

            if (!games || !consoles) { // Check if games and consoles are empty
    
            res.render('pages/index', {
                title: 'Home',
                users: result,
                currentHome: 'current',
                currentPreference: 'none',
                currentProfile: 'none'
            }) 
            }  else {
                res.render('pages/index', {
                    title: 'Home',
                    users: resultData,
                    currentHome: 'current',
                    currentPreference: 'none',
                    currentProfile: 'none'
                }) 
            }   
        })

          
    })

    // ERROR
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