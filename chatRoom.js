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
const getUser = (username, roomId) => {

    const room = getRoom(roomId)
    const user = room.users.find(user => user.username === username)
    return user
}


// add user to room
const addUser = (username, roomId, status = "active") => {
    
    const room = getRoom(roomId)

    room.users.push({
        username : username,
        status: status
    })

}

// remove a user from a room
const removeUser = (username, roomId) => {
    
    const room = getRoom(roomId)

    const user = getUser(username, roomId)

    room.users.splice(room.users.indexOf(user), 1)

}

// add a new message to a room
const addMessage = (message, username, roomId) => {

    const newMessage = { text: message, username: username }

    const room = getRoom(roomId)

    room.messages.push(newMessage)

}

// get all messages from a room
const getMessages = (roomId) => {

    const room = rooms.find(room => room.id === roomId)

    return room.messages
    
}

// set the status of a user
const setUserStatus = (username, status, roomId) => {

    const user = getUser(username, roomId)

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