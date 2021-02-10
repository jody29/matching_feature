const express = require('express')
const PORT = 8080
const app = express()


app.set('view engine', 'ejs')

// index page
app.get('/', function (req, res) {
    res.render('pages/index')
})

// Profile page
app.get('/profile', function (req, res) {
    res.render('pages/profile')
})

app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`)
})