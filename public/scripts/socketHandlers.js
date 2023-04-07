const registerSocketHandlers = (socket) => {

    const sendRoomId = (roomId) => {

        $(selectors.roomIdInput).val(roomId)

    }

    const sendRoom = (room) => {

        const username = $('#usernameInput').val()

        // store room and username
        localStorage.setItem('roomKey', room.id)
        localStorage.setItem('username', username)

        // show chat room gui
        $(selectors.joinRoomForm).hide()
        chatRoom.setUp(room, username)
        chatRoom.show()

    }

    const roomNotFound = (roomId) => {

        alert(`Room ${roomId} not found`)

    }

    const newMessage = (text, username) => {

        chatRoom.appendMessage(text, username)

    }

    const updateUsers = (users) => {

        chatRoom.renderUsersList(users)

    }

    socket.on("sendRoomId", sendRoomId)
    socket.on("sendRoom", sendRoom)
    socket.on("roomNotFound", roomNotFound)
    socket.on("newMessage", newMessage)
    socket.on("updateUsers", updateUsers)

}