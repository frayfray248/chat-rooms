const registerSocketHandlers = (socket, EVENTS) => {

    const sendRoomId = (roomId) => {

        $(selectors.roomIdInput).val(roomId)

    }

    const showRoom = (roomId, messages, users) => {

        const username = $('#usernameInput').val()

        // store room and username
        localStorage.setItem('roomKey', roomId)
        localStorage.setItem('username', username)

        // clear and hide join room form
        $(selectors.joinRoomForm).find('input[type="text"').val('')
        $(selectors.joinRoomForm).hide()

        // show chat room gui
        chatRoom.setUp(roomId, messages, users)
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

    const userTyping = (username) => {

        chatRoom.updateTyping(username)

    }

    const updateUserStatus = (username, status) => {

        chatRoom.updateUserStatus(username, status)

    }

    const handleError = (message) => {

        alert(message)

    }

    socket.on(EVENTS.SEND_ROOM_ID, sendRoomId)
    socket.on(EVENTS.ROOM_NOT_FOUND, roomNotFound)
    socket.on(EVENTS.UPDATE_MESSAGES, updateMessages)
    socket.on(EVENTS.UPDATE_USERS, updateUsers)
    socket.on(EVENTS.USER_TYPING, userTyping)
    socket.on(EVENTS.LEAVE_ROOM, leaveRoom)
    socket.on(EVENTS.UPDATE_STATUS, updateUserStatus)
    socket.on(EVENTS.ERROR, handleError)
    socket.on(EVENTS.SHOW_ROOM, showRoom)

}