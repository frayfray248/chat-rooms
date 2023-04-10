const crypto = require('crypto')

const rooms = []

// create a new room
const createRoom = () => {

    const newRoomId = crypto.randomBytes(2).toString('hex')

    rooms.push({
        id: newRoomId,
        messages: [],
        users: []
    })

    return newRoomId
}

// get a room by an id
const getRoom = (roomId) => {

    return rooms.find(room => room.id === roomId)

}

// get a user in a room
const getUser = (userId, roomId) => {

    const room = getRoom(roomId)

    if (!room) return null 

    const user = room.users.find(user => user.id === userId)

    return user
}


// add user to room
const addUser = (id, username, roomId, status = "active") => {
    
    const room = getRoom(roomId)

    room.users.push({
        id : id,
        username : username,
        status: status
    })

}

// remove a user from a room
const removeUser = (userId, roomId) => {
    
    const room = getRoom(roomId)

    const user = getUser(userId, roomId)

    room.users.splice(room.users.indexOf(user), 1)

}

// add a new message to a room
const addMessage = (message, userId, roomId) => {

    const user = getUser(userId, roomId)

    const newMessage = { text: message, username: user.username }

    const room = getRoom(roomId)

    room.messages.push(newMessage)

}

// get all messages from a room
const getMessages = (roomId) => {

    const room = rooms.find(room => room.id === roomId)

    return room.messages
    
}

// set the status of a user
const setUserStatus = (userId, status, roomId) => {
    console.log(userId, status, roomId)

    const user = getUser(userId, roomId)

    user.status = status

}

module.exports = {
    createRoom : createRoom,
    getRoom : getRoom,
    addMessage : addMessage,
    getMessages : getMessages,
    addUser : addUser,
    removeUser : removeUser,
    setUserStatus : setUserStatus
}