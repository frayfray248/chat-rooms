const registerSocketHandlers = (socket) => {

    const sendRoomId = (roomId) => {

        $(selectors.roomIdInput).val(roomId)

    }

    const sendRoom = (room) => {

        // show chat room gui
        $(selectors.joinRoomForm).hide()
        chatRoom.setUp(room)
        chatRoom.show()

        // store room and username
        localStorage.setItem('roomKey', room.id)
        localStorage.setItem('username', $('#usernameInput').val())

    }

    const roomNotFound = (roomId) => {

        alert(`Room ${roomId} not found`)

    }

    const newMessage = (text, username) => {

        chatRoom.appendMessage(text, username)

    }

    socket.on("sendRoomId", sendRoomId)
    socket.on("sendRoom", sendRoom)
    socket.on("roomNotFound", roomNotFound)
    socket.on("newMessage", newMessage)

}