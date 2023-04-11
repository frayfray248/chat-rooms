const registerDOMHandlers = (socket, EVENTS) => {

    const createRoomHandler = (event) => {
        event.preventDefault()

        const socket = event.data.socket

        socket.emit(EVENTS.CREATE_ROOM)

    }

    const joinRoomHandler = (event) => {
        event.preventDefault()

        const socket = event.data.socket

        // get join room form input
        const roomId = joinRoomForm.getRoomIdInput()
        const username = joinRoomForm.getUsernameInput()

        // request to join room
        socket.emit(EVENTS.JOIN_ROOM, roomId, username)
    }

    const leaveRoomHandler = (event) => {
        const roomId = localStorage.getItem('roomId')

        localStorage.removeItem('username')
        localStorage.removeItem('roomId')
        resetIdleTimer(event.data.socket)

        socket.emit(EVENTS.LEAVE_ROOM, roomId)
    }

    const sendMessage = (event) => {
        const text = $('#messageInput').val()

        if (!text) return

        const socket = event.data.socket

        socket.emit(EVENTS.SEND_MESSAGE, text)
        $('#messageInput').val("")

    }

    const sendMessageHandler = (event) => {
        event.preventDefault()
        sendMessage(event)
    }

    const enterKeyPressedHandler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            sendMessage(event)
        }
    }

    const throttle = (cb, delay = 1000) => {
        let shouldWait = false
        let waitingArgs

        const timeoutFunc = () => {
            if (waitingArgs == null) {
                shouldWait = false
            } else {
                cb(...waitingArgs)
                waitingArgs = null
                setTimeout(timeoutFunc, delay)
            }
        }

        return (...args) => {
            if (shouldWait) {
                waitingArgs = args
                return
            }

            cb(...args)
            shouldWait = true

            setTimeout(timeoutFunc, delay)
        }
    }

    const updateTypingStatus = throttle(() => {
        socket.emit(EVENTS.TYPING, localStorage.getItem('username'), localStorage.getItem('roomId'))
    })

    const updateActivityStatus = throttle(() => {

        if (localStorage.getItem('username') && localStorage.getItem('roomId')) {
            socket.emit(EVENTS.UPDATE_STATUS, "active")
        }
        
    })

    const typingHandler = (event) => {
        updateTypingStatus()
    }


    const resetIdleTimer = (() => {

        

        let timeout

        return (socket) => {

            clearTimeout(timeout)

            if (!localStorage.getItem('username') || !localStorage.getItem('roomId')) {
                return
            }

            timeout = setTimeout(() => {

                if (localStorage.getItem('username') && localStorage.getItem('roomId')) {

                    socket.emit(EVENTS.UPDATE_STATUS, "idle")

                }

            }, 5000)
        }
    })()

    const resetIdleTimerHandler = (event) => {

        resetIdleTimer(event.data.socket)
        updateActivityStatus()
        
    }

    localStorage.removeItem('username')
    localStorage.removeItem('roomId')

    $(selectors.createRoomButton).on('click', { socket: socket }, createRoomHandler)
    $(selectors.joinRoomForm).on('submit', { socket: socket }, joinRoomHandler)
    $(selectors.chatRoomLeaveButton).on('click', { socket: socket }, leaveRoomHandler)
    $(selectors.messageForm).on('submit', { socket: socket }, sendMessageHandler)
    $(selectors.messageInput).on("keydown", { socket: socket }, enterKeyPressedHandler)
    $(selectors.messageInput).on('input', typingHandler)
    $(document).on("mousemove", { socket: socket }, resetIdleTimerHandler)
    $(document).on("keydown", { socket: socket }, resetIdleTimerHandler)
    $(document).on("touchstart", { socket: socket }, resetIdleTimerHandler)

    

    resetIdleTimer(socket)

}

