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

        const games = req.body.games
        const lowerGames = games.toLowerCase()

        const newUser = {
            username: req.body.username,
            chosenConsoles: req.body.chosenConsoles,
            games: lowerGames
        }

        dbCollection.insertOne(newUser, (error) => { // Insert newUser to database
                if (error) throw error
        })
      
        
        res.redirect('../users') // Redirect back to user page after insertion
    })

    router.post('/updateUser', (req, res) => {
        const games = req.body.games // request games

        const lowerGames = games.toLowerCase() // games to lower case

        const item = { // create item that has to be updated
            username: req.body.username,
            chosenConsoles: req.body.chosenConsoles,
            games: lowerGames
        } 

        const itemId = req.body.id // request id of item
        

        dbCollection.findOneAndUpdate({ '_id': new ObjectID(itemId) }, { $set: item }, (error) => { // update user in database
            if (error) throw error
        })

        res.redirect('../users') // redirect back to user page


    })

    const sameConsole = (console, prefConsole) => { // filter that checks if it is the same console
        return console === prefConsole
    }

    const sameGame = (game, prefGame) => { // filter that checks if it is the same game
        return game === prefGame
    }

    router.post('/partials/preferenceForm', (req, res) => { // PREFERENCE FORM
        
        dbCollection.find().toArray(function(err, result) { // Get data from database that has to be filtered
            if (err) throw err
            let data = result // result becomes data

            const games = req.body.games
            const consoles = req.body.chosenConsoles

            const lowerGames = games.toLowerCase() // games string to lower case for validation
            
            const resultData = data.filter((user) => sameConsole(user.chosenConsoles, consoles) && sameGame(user.games, lowerGames)) // filter the data from the db

            if (!games || !consoles) { // Check if games and consoles are empty
    
            res.render('pages/index', { // render the full user list if the preference form is empty
                title: 'Home',
                users: result,
                currentHome: 'current',
                currentPreference: 'none',
                currentProfile: 'none'
            }) 
            }  else {
                res.render('pages/index', { // render the filter result if preference form is not empty
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
        res.status(404).render('pages/404', { // set status code to 404 and render the 404 page
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


module.exports = router