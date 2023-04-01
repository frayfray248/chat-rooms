// modules
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

// app
const app = express()
const server = http.createServer(app)
const io = new Server(server)

// vars
const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())

// serve static
app.use('/', async (req, res) => res.send("Hello"))

// start server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

