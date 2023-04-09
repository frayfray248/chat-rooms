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

    // disconnect a socket from a room
    const leaveRoom = (username, roomId) => {

        const room = chatRoom.getRoom(roomId)
        chatRoom.removeUser(username, room.id)
        socket.leave(room.id)
        socket.emit('leaveRoom')
        io.to(room.id).emit("updateUsers", room.users)

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

    const updateStatus = (username, roomId, status) => {

        console.log(username)
        console.log(roomId)
        console.log(status)
        const room = chatRoom.getRoom(roomId)
        console.log(room)

        chatRoom.setUserStatus(username, status, roomId)
        io.to(room.id).emit("updateUsers", room.users)
        //io.to(roomId).emit("updateUserStatus", username, status)

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
    socket.on("leaveRoom", leaveRoom)
    socket.on("updateStatus", updateStatus)

}