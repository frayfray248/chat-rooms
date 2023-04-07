const chatRoom = require('./chatRoom')

module.exports = (io, socket) => {

    // create a room
    const createRoom = () => {

        const newRoomId = chatRoom.createRoom()

        socket.emit('sendRoomId', newRoomId)

    }

    // join a socket to a room
    const joinRoom = (roomId, username) => {

        const room = chatRoom.getRoom(roomId)
        console.log(room)
        

        if (room) {
            socket.join(roomId)
            chatRoom.addUser(username, room.id)
            socket.emit("sendRoom", room)
            io.to(room.id).emit("updateUsers", room.users)
        }
        else {
            socket.emit('roomNotFound', roomId)
        }

    }

    // send message to a room
    const sendMessage = (message, username, roomId) => {

        chatRoom.addMessage(message, username, roomId)

        io.to(roomId).emit('newMessage', message, username)

        // should return all messages or make an update messages handler

    }

    // get a room
    const getMessages = (roomId) => {

        chatRoom.getMessages(roomId)

    }

    socket.on("createRoom", createRoom)
    socket.on("joinRoom", joinRoom)
    socket.on("sendMessage", sendMessage)
    socket.on("getMessage", getMessages)

}