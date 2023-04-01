// modules
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const crypto = require('crypto')

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

// socket
io.on('connection', (socket) => {

    console.log(`Client ${socket.id} connected`)

    socket.on('createRoom', () => {

        const key = crypto.randomBytes(2).toString('hex')

        socket.emit('sendKey', key)
        
    })

    socket.on('joinRoom', (key, username) => {

        socket.join(key)
        
        socket.emit("sendRoom", key)

    })

})

// start server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

