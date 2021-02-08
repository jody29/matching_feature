const http = require('http')
const fs = require('fs')

const hostname = 'localhost'
const port = 8080
const index = fs.readFileSync('index.html')

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(index)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})
