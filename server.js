const express = require('express')
const app = express()
const path = require('path')
const PORT = 8080

// EJS setup
app.set('view engine', 'ejs')
// Set views folder
app.set('views', path.join(__dirname, 'views'))
// Get static files from public folder
app.use(express.static(__dirname + '/public'))


// index page
app.get('/', function (req, res) {
    res.render('pages/index', {title: 'Home'})
})

// Profile page
app.get('/profile', function (req, res) {
    res.render('pages/profile', {title: 'Profile'})
})

app.get('*', function (req, res) {
    res.status(404).render('pages/404')
})

// Express listens to PORT 8080
app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`)
})