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

    // create a chat room handler
    socket.on('createRoom', () => {

        const newRoomId = crypto.randomBytes(2).toString('hex')

        rooms.push({
            id: newRoomId,
            messages: []
        })

        socket.emit('sendKey', newRoomId)

    })

    // join a chat room handler
    socket.on('joinRoom', (roomId, username) => {

        if (rooms.find(room => room.id === roomId)) {
            socket.join(roomId)

            socket.emit("sendRoom", roomId, username)
        }
        else {
            socket.emit("roomNotFound", key)
        }

    })

    // send a message handler
    socket.on('sendMessage', (message, username, roomId) => {

        
        io.to(roomId).emit('newMessage', message, username)

    })

    // get messages handler
    socket.on('getMessages', roomId => {

        const messages = rooms.find(room => room.id === roomId).messages

        socket.emit('sendMessages', messages)

    })

})

// start server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

