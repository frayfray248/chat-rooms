const chatRooms = require('./chatRooms')
const EVENTS = require('./events')

module.exports = (io, socket) => {

    // create a room
    const createRoom = () => {

        const newRoomId = chatRooms.createRoom()

        socket.emit(EVENTS.SEND_ROOM_ID, newRoomId)

    }

    // join a socket to a room
    const joinRoom = (roomId, username) => {

        const room = chatRooms.getRoom(roomId)

        if (room) {
            socket.join(roomId)
            chatRooms.addUser(socket.id, username, room.id)
            socket.emit(EVENTS.SEND_ROOM, room)
            io.to(room.id).emit(EVENTS.UPDATE_USERS, room.users)
        }
        else {
            socket.emit(EVENTS.ROOM_NOT_FOUND, roomId)
        }

    }

    // disconnect a socket from a room
    const leaveRoom = (roomId) => {

        const room = chatRooms.getRoom(roomId)
        chatRooms.removeUser(socket.id, room.id)
        socket.leave(room.id)
        socket.emit(EVENTS.LEAVE_ROOM)
        io.to(room.id).emit(EVENTS.UPDATE_USERS, room.users)

    }

    // send message to a room
    const sendMessage = (message, roomId) => {

        chatRooms.addMessage(message, socket.id, roomId)
        
        const room = chatRooms.getRoom(roomId)

        io.to(roomId).emit(EVENTS.UPDATE_MESSAGES, room.messages)

    }

    const typing = (username, roomId) => {
        
        io.to(roomId).emit("typing", username)

    }

    const updateStatus = (username, roomId, status) => {

        const room = chatRooms.getRoom(roomId)

        chatRooms.setUserStatus(socket.id, status, roomId)
        io.to(room.id).emit(EVENTS.UPDATE_USERS, room.users)
        //io.to(roomId).emit("updateUserStatus", username, status)

    }

    // get a room
    const getMessages = (roomId) => {

        chatRooms.getMessages(roomId)

    }

    // error wrapper
    const errorWrapper = (socketHandler) => {

        return (...args) => {
            try {
                socketHandler(...args)
    
            } catch (error) {
    
                console.log(error.message)
                socket.emit(EVENTS.ERROR, "Server error")
    
            }
        }
    }


    socket.on(EVENTS.CREATE_ROOM, errorWrapper(createRoom))
    socket.on(EVENTS.JOIN_ROOM, errorWrapper(joinRoom))
    socket.on(EVENTS.SEND_MESSAGE, errorWrapper(sendMessage))
    socket.on(EVENTS.GET_MESSAGES, errorWrapper(getMessages))
    socket.on(EVENTS.TYPING, errorWrapper(typing))
    socket.on(EVENTS.LEAVE_ROOM, errorWrapper(leaveRoom))
    socket.on(EVENTS.UPDATE_STATUS, errorWrapper(updateStatus))

}