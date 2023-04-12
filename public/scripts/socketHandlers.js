// this script defines and registers all the client socket handlers

const registerSocketHandlers = (socket, EVENTS) => {

    // receive a room ID
    const sendRoomId = (roomId) => {

        joinRoomForm.setRoomIdInput(roomId)

    }


    // show chatroom and inject it with room data
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

    // close chat room view
    const closeRoom = () => {

        chatRoom.clear()
        chatRoom.hide()
        joinRoomForm.show()

    }

    // add a joined user
    const receiveUser = (user) => {

        chatRoom.addUser(user, false)

    }

    // remove a user who left
    const removeUser = (username) => {

        chatRoom.removeUser(username)

    }

    // update the activity status of a user
    const updateUserStatus = (username, status) => {

        chatRoom.updateUserStatus(username, status)

    }

    // userTyping handler function
    // keeps track of typing timers for each user using a Map object
    const userTyping = (() => {

        const typingTimers = new Map()

        // the actual handler function that takes a username as argument
        return (username) => {

            // show user's typing indicator
            chatRoom.showUserTyping(username, true)

            // get the typingTimer associated with the current user, if any
            const typingTimer = typingTimers.get(username)

            if (typingTimer) {
                // if there is a typingTimer, clear the previous timeout
                clearTimeout(typingTimer)
            }

            // set a new timeout function to run after 1500 ms
            const timeout = setTimeout(() => {

                // hides user's typing indicator
                chatRoom.showUserTyping(username, false)

            }, 1500)

            // store the timeout function in the Map object with the username as key
            typingTimers.set(username, timeout)

        }
    })()


    // receive a new message from a user
    const receiveMessage = (text, username) => {

        chatRoom.appendMessage(text, username)

    }


    // no room found alert for when the user enters a room ID for
    // a non-existant room
    const roomNotFound = (roomId) => {

        alert(`Room ${roomId} not found`)

    }

    // simple error handler
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