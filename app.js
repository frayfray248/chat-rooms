// modules
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

// socket handlers
const registerSocketHandlers = require('./socketHandlers')

// constants
const EVENTS = require('./events.js')

// app
const app = express()
const server = http.createServer(app)
const io = new Server(server)

// vars
const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())

// serve static
app.use('/', express.static('public'))

// serve constants
app.get('/events', (req, res) => {
    res.json(EVENTS)
})

// socket
io.on('connection', (socket) => { registerSocketHandlers(io, socket) })

// start server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

