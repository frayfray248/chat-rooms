const crypto = require('crypto')

const rooms = []

// create a new room
const createRoom = () => {

    const newRoomId = crypto.randomBytes(2).toString('hex')

    rooms.push({
        id: newRoomId,
        messages: []
    })

    return newRoomId
}

// get a room by an id
const getRoom = (roomId) => {

    return rooms.find(room => room.id === roomId)

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
    getMessages : getMessages
}