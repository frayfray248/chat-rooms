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

// add user to room
const addUser = (username, roomId) => {
    
    const room = getRoom(roomId)

    room.users.push(username)

}

// remove a user from a room
const removeUser = (username, roomId) => {
    
    const room = getRoom(roomId)

    console.log(room)

    room.users.splice(room.users.indexOf(username), 1)

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

module.exports = {
    createRoom : createRoom,
    getRoom : getRoom,
    addMessage : addMessage,
    getMessages : getMessages,
    addUser : addUser,
    removeUser : removeUser
}