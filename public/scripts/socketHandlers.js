const registerSocketHandlers = (socket, EVENTS) => {

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

    const updateUserStatus = (username, status) => {

        chatRoom.updateUserStatus(username, status)

    }

    const handleError = (message) => {

        alert(message)

    }

    socket.on(EVENTS.SEND_ROOM_ID, sendRoomId)
    socket.on(EVENTS.SEND_ROOM, sendRoom)
    socket.on(EVENTS.ROOM_NOT_FOUND, roomNotFound)
    socket.on(EVENTS.UPDATE_MESSAGES, updateMessages)
    socket.on(EVENTS.UPDATE_USERS, updateUsers)
    socket.on(EVENTS.USER_TYPING, typing)
    socket.on(EVENTS.LEAVE_ROOM, leaveRoom)
    socket.on(EVENTS.UPDATE_STATUS, updateUserStatus)
    socket.on(EVENTS.ERROR, handleError)

}