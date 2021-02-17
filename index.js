const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand(myEnv);

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const slug = require('slug')
const path = require('path')
const PORT = 8080
const router = require('./route/router')


// EJS setup
app.set('view engine', 'ejs')
// Set views folder
app.set('views', path.join(__dirname, 'views'))
// Use static files from public folder
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Use the router when on index page
app.use('/', router)

// Express listens to PORT 8080
app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`)
})



