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

const rooms = []

// socket
io.on('connection', (socket) => {

    console.log(`Client ${socket.id} connected`)

    socket.on('createRoom', () => {

        const key = crypto.randomBytes(2).toString('hex')

        rooms.push(key)

        socket.emit('sendKey', key)

    })

    socket.on('joinRoom', (key, username) => {

        if (rooms.find(room => room === key)) {
            socket.join(key)

            socket.emit("sendRoom", key, username)
        }
        else {
            socket.emit("roomNotFound", key)
        }

    })

    socket.on('sendMessage', (message, username, room) => {

        io.to(room).emit('newMessage', message, username)

    })

})

// start server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

