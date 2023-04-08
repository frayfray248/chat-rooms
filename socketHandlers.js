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
        
        const room = chatRoom.getRoom(roomId)

        io.to(roomId).emit('updateMessages', room.messages)

    }

    const typing = (username, roomId) => {
        
        io.to(roomId).emit("typing", username)

    }

    // get a room
    const getMessages = (roomId) => {

        chatRoom.getMessages(roomId)

    }

    socket.on("createRoom", createRoom)
    socket.on("joinRoom", joinRoom)
    socket.on("sendMessage", sendMessage)
    socket.on("getMessage", getMessages)
    socket.on('typing', typing)

}