const chatRoom = require('./chatRoom')
const EVENTS = require('./events')

module.exports = (io, socket) => {

    // create a room
    const createRoom = () => {

        const newRoomId = chatRoom.createRoom()

        socket.emit(EVENTS.SEND_ROOM_ID, newRoomId)

    }

    // join a socket to a room
    const joinRoom = (roomId, username) => {

        const room = chatRoom.getRoom(roomId)

        if (room) {
            socket.join(roomId)
            chatRoom.addUser(username, room.id)
            socket.emit(EVENTS.SEND_ROOM, room)
            io.to(room.id).emit(EVENTS.UPDATE_USERS, room.users)
        }
        else {
            socket.emit(EVENTS.ROOM_NOT_FOUND, roomId)
        }

    }

    // disconnect a socket from a room
    const leaveRoom = (username, roomId) => {

        const room = chatRoom.getRoom(roomId)
        chatRoom.removeUser(username, room.id)
        socket.leave(room.id)
        socket.emit(EVENTS.LEAVE_ROOM)
        io.to(room.id).emit(EVENTS.UPDATE_USERS, room.users)

    }

    // send message to a room
    const sendMessage = (message, username, roomId) => {

        chatRoom.addMessage(message, username, roomId)
        
        const room = chatRoom.getRoom(roomId)

        io.to(roomId).emit(EVENTS.UPDATE_MESSAGES, room.messages)

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
        io.to(room.id).emit(EVENTS.UPDATE_USERS, room.users)
        //io.to(roomId).emit("updateUserStatus", username, status)

    }

    // get a room
    const getMessages = (roomId) => {

        chatRoom.getMessages(roomId)

    }

    socket.on(EVENTS.CREATE_ROOM, createRoom)
    socket.on(EVENTS.JOIN_ROOM, joinRoom)
    socket.on(EVENTS.SEND_MESSAGE, sendMessage)
    socket.on(EVENTS.GET_MESSAGES, getMessages)
    socket.on(EVENTS.TYPING, typing)
    socket.on(EVENTS.LEAVE_ROOM, leaveRoom)
    socket.on(EVENTS.UPDATE_STATUS, updateStatus)

}