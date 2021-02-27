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

const db = require('./model/db')
const dbName = process.env.DB_NAME
const collectionName = 'users'


// EJS setup
app.set('view engine', 'ejs')
// Set views folder
app.set('views', path.join(__dirname, 'views'))
// Use static files from public folder
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())

db.initialize(dbName, collectionName, function(dbCollection) {
   dbCollection.find().toArray(function(err, result) {
      if (err) throw err
      console.log(result);
   })

}, function(err) {
   throw (err)
})



// Use the router when on index page
app.use('/', router)



// Express listens to PORT 8080
app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`)
})



