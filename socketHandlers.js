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
        // generate a new room id and send it to the client
        const newRoomId = chatRoomStore.createRoom()
        socket.emit(EVENTS.SEND_ROOM_ID, newRoomId)
    }

    // join a socket to a room
    const joinRoom = async (roomId, username) => {
        const room = chatRoomStore.getRoom(roomId)

        if (room) {
            // join socket to room
            socket.join(roomId)

            const newUser = {
                username: username,
                roomId: roomId,
                status: "active"
            }

            // create a new user and store it
            userStore.add(socket.id, newUser)

            // get all users in the room
            const users = await getRoomUsers(roomId)

            // inform the client to set up the room with the messages and users
            socket.emit(EVENTS.SHOW_ROOM, roomId, room.messages, users)

            // update all clients' users list that someone joined the room
            socket.to(room.id).emit(EVENTS.USER_JOINED, newUser)
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

        // remove the user from the store
        userStore.remove(socket.id)

        // get all users in the room
        const users = await getRoomUsers(roomId)

        // inform the client to close their room view
        socket.emit(EVENTS.CLOSE_ROOM)

        // inform the rest of the chat room users that a user has left
        socket.to(roomId).emit(EVENTS.USER_LEFT, user.username)
    }

    // update user status in a room
    const updateStatus = async (status) => {
        const user = userStore.get(socket.id)

        if (user) {
            // update user's status and get the room ID
            user.status = status
            const roomId = user.roomId

            // update all clients' users list with the updated status
            io.to(roomId).emit(EVENTS.UPDATE_USER_STATUS, user.username, status)
        }
        else {
            // emit an error if the user is not found
            socket.emit(EVENTS.ERROR, `User ${socket.id} not found`)
        }
    }

    // send typing notification to a room
    const typing = async () => {
        const user = userStore.get(socket.id)
        const roomId = user.roomId

        // notify all clients in the room that the user is typing
        io.to(roomId).emit(EVENTS.USER_TYPING, user.username)
    }

    // send message to a room
    const sendMessage = async (text) => {
        const user = userStore.get(socket.id)
        const roomId = user.roomId

        // add the message to the room's messages
        chatRoomStore.addMessage(text, user.username, roomId)

        io.to(roomId).emit(EVENTS.SEND_MESSAGE, text, user.username)

    }

    // get a room's messages
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


    // register socket event handlers
    socket.on(EVENTS.CREATE_ROOM, errorWrapper(createRoom))
    socket.on(EVENTS.JOIN_ROOM, errorWrapper(joinRoom))
    socket.on(EVENTS.LEAVE_ROOM, errorWrapper(leaveRoom))
    socket.on(EVENTS.UPDATE_STATUS, errorWrapper(updateStatus))
    socket.on(EVENTS.TYPING, errorWrapper(typing))
    socket.on(EVENTS.SEND_MESSAGE, errorWrapper(sendMessage))
    socket.on(EVENTS.GET_MESSAGES, errorWrapper(getMessages))
}