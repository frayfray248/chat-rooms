const registerSocketHandlers = (socket, EVENTS) => {

    const sendRoomId = (roomId) => {

        joinRoomForm.setRoomIdInput(roomId)

    }

    const showRoom = (roomId, messages, users) => {

        const username = joinRoomForm.getUsernameInput()

        // store room and username
        localStorage.setItem('roomId', roomId)
        localStorage.setItem('username', username)

        // clear and hide join room form
        joinRoomForm.clear()
        joinRoomForm.hide()

        // show chat room gui
        chatRoom.setUp(roomId, messages, users)
        chatRoom.show()

    }

    const closeRoom = () => {

        chatRoom.clear()
        chatRoom.hide()
        joinRoomForm.show()

    }

    const receiveUser = (user) => {

        chatRoom.addUser(user, false)

    }

    const removeUser = (username) => {

        chatRoom.removeUser(username)

    }

    const updateUserStatus = (username, status) => {

        chatRoom.updateUserStatus(username, status)

    }

    const userTyping = (() => {

        const typingTimers = new Map()

        return (username) => {

            chatRoom.showUserTyping(username, true)

            const typingTimer = typingTimers.get(username)

            if (typingTimer) {

                clearTimeout(typingTimer)

            }

            const timeout = setTimeout(() => {

                console.log(`${username} is done typing`)

                chatRoom.showUserTyping(username, false)

            }, 1500)

            typingTimers.set(username, timeout)

        }
    })()


    const receiveMessage = (text, username) => {

        chatRoom.appendMessage(text, username)

    }
    

    const roomNotFound = (roomId) => {

        alert(`Room ${roomId} not found`)

    }

    const handleError = (message) => {

        alert(message)

    }

    socket.on(EVENTS.SEND_ROOM_ID, sendRoomId)
    socket.on(EVENTS.SHOW_ROOM, showRoom)
    socket.on(EVENTS.CLOSE_ROOM, closeRoom)
    socket.on(EVENTS.USER_JOINED, receiveUser)
    socket.on(EVENTS.USER_LEFT, removeUser)
    socket.on(EVENTS.UPDATE_USER_STATUS, updateUserStatus)
    socket.on(EVENTS.USER_TYPING, userTyping)
    socket.on(EVENTS.SEND_MESSAGE, receiveMessage)
    socket.on(EVENTS.ROOM_NOT_FOUND, roomNotFound)
    socket.on(EVENTS.ERROR, handleError)

}