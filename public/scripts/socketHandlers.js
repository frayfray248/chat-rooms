const registerSocketHandlers = (socket) => {

    const sendRoomId = (roomId) => {

        $(selectors.roomIdInput).val(roomId)

    }

    const sendRoom = (room) => {

        const username = $('#usernameInput').val()

        // store room and username
        localStorage.setItem('roomKey', room.id)
        localStorage.setItem('username', username)

        // clear and hide join room form
        $(selectors.joinRoomForm).find('input[type="text"').val('')
        $(selectors.joinRoomForm).hide()

        // show chat room gui
        chatRoom.setUp(room, username)
        chatRoom.show()

    }

    const leaveRoom = () => {

        chatRoom.hide()
        $(selectors.joinRoomForm).show()

    }

    const roomNotFound = (roomId) => {

        alert(`Room ${roomId} not found`)

    }

    const updateMessages = (messages) => {

        chatRoom.renderMessages(messages)

    }

    const updateUsers = (users) => {

        chatRoom.renderUsersList(users)

    }

    const typing = (username) => {

        chatRoom.updateTyping(username)

    }

    socket.on("sendRoomId", sendRoomId)
    socket.on("sendRoom", sendRoom)
    socket.on("roomNotFound", roomNotFound)
    socket.on("updateMessages", updateMessages)
    socket.on("updateUsers", updateUsers)
    socket.on('typing', typing)
    socket.on("leaveRoom", leaveRoom)

}