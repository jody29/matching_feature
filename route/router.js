const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

// Database variabels
const db = require('../model/db')
const { ObjectID, MongoClient } = require('mongodb')
const { ENOTEMPTY } = require('constants')
const dbName = process.env.DB_NAME
const collectionName = 'users'
const adminCollection = 'admin'

db.initialize(
    dbName,
    collectionName,
    (dbCollection) => {
        // Initialize the database

        router.get('/', (req, res) => {
            // Home page

            dbCollection
                .find()
                .toArray()
                .then((results) => {
                    // Get all data from database
                    res.render('pages/index', {
                        // Render home page
                        users: results,
                        title: 'Home',
                        currentHome: 'current',
                        currentProfile: 'none',
                        currentPreference: 'none',
                    })
                })
        })

        router.get('/admin', (req, res) => {
            if (req.session.loggedIn) {
                res.redirect('../users')
            } else {
                res.render('pages/admin', {
                    title: 'Admin',
                })
            }
        })

        router.post(
            '/adminLogin',
            (req, res, next) => {
                const login = req.body.adminUser
                const pass = req.body.adminPass

                db.initialize(dbName, adminCollection, (dbCollection) => {
                    dbCollection.findOne(
                        {
                            $or: [{ adminUser: login }, { adminPass: pass }],
                        },
                        (err, result) => {
                            if (login === '' || pass === '') {
                                res.redirect('../admin')
                            } else {
                                if (
                                    result.adminUser === login &&
                                    result.adminPass === pass
                                ) {
                                    res.locals.username = login
                                    next()
                                } else {
                                    res.redirect('../admin')
                                }
                            }
                        }
                    )
                })
            },
            (req, res) => {
                req.session.loggedIn = true
                req.session.username = res.locals.username
                console.log(req.session)
                res.redirect('../users')
            }
        )

        router.get('/users', (req, res) => {
            // Users page

            if (!req.session.loggedIn) {
                res.redirect('../admin')
            } else {
                dbCollection
                    .find()
                    .toArray()
                    .then((results) => {
                        // Get all data from database
                        res.render('pages/users', {
                            // Render user page
                            user: results,
                            title: 'Users',
                        })
                    })
            }
        })

        router.post('/delete', (req, res) => {
            dbCollection.deleteOne(
                {
                    _id: new ObjectID(req.body.id),
                },
                (err, result) => {
                    if (err) throw err
                    dbCollection.find().toArray((err, result) => {
                        if (err) throw err
                        res.redirect('../users')
                    })
                }
            )
        })

        router.get('/logout', (req, res) => {
            req.session.destroy((err) => {})
            res.redirect('../admin')
        })

        router.post('/partials/addUserForm', (req, res) => {
            // Post request for add user

            const games = req.body.games
            const lowerGames = games.toLowerCase()

            const newUser = {
                username: req.body.username,
                chosenConsoles: req.body.chosenConsoles,
                games: lowerGames,
            }

            if (
                req.body.username === '' ||
                req.body.chosenConsoles === '' ||
                games === ''
            ) {
                res.redirect('../users')
            } else {
                dbCollection.insertOne(newUser, (error) => {
                    // Insert newUser to database
                    if (error) throw error
                })

                res.redirect('../users') // Redirect back to user page after insertion
            }
        })

        router.post('/updateUser', (req, res) => {
            const games = req.body.games // request games

            const lowerGames = games.toLowerCase() // games to lower case

            const item = {
                // create item that has to be updated
                username: req.body.username,
                chosenConsoles: req.body.chosenConsoles,
                games: lowerGames,
            }

            const itemId = req.body.id // request id of item

            dbCollection.findOneAndUpdate(
                { _id: new ObjectID(itemId) },
                { $set: item },
                (error) => {
                    // update user in database
                    if (error) throw error
                }
            )

            res.redirect('../users') // redirect back to user page
        })

        const sameConsole = (console, prefConsole) => {
            // filter that checks if it is the same console
            return console === prefConsole
        }

        const sameGame = (game, prefGame) => {
            // filter that checks if it is the same game
            return game === prefGame
        }

        router.post('/partials/preferenceForm', (req, res) => {
            // PREFERENCE FORM

            dbCollection.find().toArray((err, result) => {
                // Get data from database that has to be filtered
                if (err) throw err
                let data = result // result becomes data

                const games = req.body.games
                const consoles = req.body.chosenConsoles

                const lowerGames = games.toLowerCase() // games string to lower case for validation

                const resultData = data.filter(
                    (user) =>
                        sameConsole(user.chosenConsoles, consoles) &&
                        sameGame(user.games, lowerGames)
                ) // filter the data from the db

                if (!games || !consoles) {
                    // Check if games and consoles are empty

                    res.render('pages/index', {
                        // render the full user list if the preference form is empty
                        title: 'Home',
                        users: result,
                        currentHome: 'current',
                        currentPreference: 'none',
                        currentProfile: 'none',
                    })
                } else {
                    res.render('pages/index', {
                        // render the filter result if preference form is not empty
                        title: 'Home',
                        users: resultData,
                        currentHome: 'current',
                        currentPreference: 'none',
                        currentProfile: 'none',
                    })
                }
            })
        })

        // ERROR
        router.get('*', (req, res) => {
            res.status(404).render('pages/404', {
                // set status code to 404 and render the 404 page
                url: req.url,
                title: 'Error 404',
                currentPreference: 'none',
                currentProfile: 'none',
                currentHome: 'none',
            })
        })
    },
    function (err) {
        // End of db initialize
        throw err
    }
)

module.exports = router
