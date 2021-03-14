const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const myEnv = dotenv.config()
dotenvExpand(myEnv)

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 8080
const router = require('./route/router')
const session = require('express-session')
const { setegid } = require('process')

// EJS setup
app.set('view engine', 'ejs')
// Set views folder
app.set('views', path.join(__dirname, 'views'))
// Use static files from public folder
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
    session({
        cookie: { sameSite: false, secure: true },
        name: 'admin-session',
        secret: process.env.ULTRA_SECRET,
        saveUninitialized: true,
        resave: true,
        userRole: 'admin',
    })
)

// Use the router when on any page
app.use('/', router)

// Express listens to PORT 8080
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
