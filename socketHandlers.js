const chatRoomStore = require('./chatRoomStore')
const userStore = require('./userStore')
const EVENTS = require('./events')

module.exports = (io, socket) => {

    // helper method to get all users in a room
    const getRoomUsers = async (roomId) => {

        // get all sockets in a room
        const roomSockets = await io.in(roomId).fetchSockets()
        const roomUsers = []

        // get all user data by the fetched socket IDs
        for (const roomSocket of roomSockets) {

            roomUsers.push(userStore.get(roomSocket.id))

        }

        return roomUsers

    }

    // create a room
    const createRoom = () => {

        const newRoomId = chatRoomStore.createRoom()

        socket.emit(EVENTS.SEND_ROOM_ID, newRoomId)

    }

    // join a socket to a room
    const joinRoom = async (roomId, username) => {

        const room = chatRoomStore.getRoom(roomId)

        if (room) {
            // join socket to room
            socket.join(roomId)
            
            // create a new user
            userStore.add(socket.id, { 
                username : username, 
                roomId: roomId, 
                status : "active"
            })

            // get all users in the room
            const users = await getRoomUsers(roomId)

            // inform the client to set up the room
            socket.emit(EVENTS.SHOW_ROOM, roomId, room.messages, users)

            // update all clients' users list
            io.to(room.id).emit(EVENTS.UPDATE_USERS, users)
        }
        else {
            socket.emit(EVENTS.ROOM_NOT_FOUND, roomId)
        }

    }

    // disconnect a socket from a room
    const leaveRoom = async () => {

        const user = userStore.get(socket.id)
        const roomId = user.roomId

        socket.leave(roomId)

        userStore.remove(socket.id)

        const users = await getRoomUsers(roomId)

        socket.emit(EVENTS.LEAVE_ROOM)
        io.to(roomId).emit(EVENTS.UPDATE_USERS, users)

    }

    // send message to a room
    const sendMessage = async (text) => {

        const user = userStore.get(socket.id)
        const roomId = user.roomId

        chatRoomStore.addMessage(text, user.username, roomId)
        
        const room = chatRoomStore.getRoom(roomId)

        io.to(roomId).emit(EVENTS.UPDATE_MESSAGES, room.messages)

    }

    const typing = async () => {

        const user = userStore.get(socket.id)
        const roomId = user.roomId

        io.to(roomId).emit(EVENTS.USER_TYPING, user.username)

    }

    const updateStatus = async (status) => {

        const user = userStore.get(socket.id)

        if (user) {

            user.status = status
            const roomId = user.roomId

            // update all clients' users list
            io.to(roomId).emit(EVENTS.UPDATE_USERS, await getRoomUsers(roomId))

        }
        else {
            socket.emit(EVENTS.ERROR, `User ${socket.id} not found`)
        }

    }

    // get a room
    const getMessages = (roomId) => {

        chatRoomStore.getMessages(roomId)

    }

    // error wrapper
    const errorWrapper = (socketHandler) => {

        return (...args) => {
            try {
                socketHandler(...args)
    
            } catch (error) {
    
                console.log(error)
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