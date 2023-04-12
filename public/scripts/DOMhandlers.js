// this script defines and registers all the DOM handlers

const registerDOMHandlers = (socket, EVENTS) => {

    // create a room button handler
    const createRoomHandler = (event) => {
        event.preventDefault()

        const socket = event.data.socket

        socket.emit(EVENTS.CREATE_ROOM)

    }

    // join room button handler
    const joinRoomHandler = (event) => {
        event.preventDefault()

        const socket = event.data.socket

        // get join room form input
        const roomId = joinRoomForm.getRoomIdInput()
        const username = joinRoomForm.getUsernameInput()

        // request to join room
        socket.emit(EVENTS.JOIN_ROOM, roomId, username)
    }

    // leave room button handler
    const leaveRoomHandler = (event) => {
        const roomId = localStorage.getItem('roomId')

        localStorage.removeItem('username')
        localStorage.removeItem('roomId')
        resetIdleTimer(event.data.socket)

        socket.emit(EVENTS.LEAVE_ROOM, roomId)
    }

    // send message function
    const sendMessage = (event) => {
        const text = $('#messageInput').val()

        if (!text) return

        const socket = event.data.socket

        socket.emit(EVENTS.SEND_MESSAGE, text)
        $('#messageInput').val("")

    }

    // send message button handler
    const sendMessageHandler = (event) => {
        event.preventDefault()
        sendMessage(event)
    }

    // send message on 'enter' key pressed handler
    const enterKeyPressedHandler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            sendMessage(event)
        }
    }

    // Throttle a function to limit its execution rate
    // cb: the callback function to be throttled
    // delay: the minimum amount of time between each function call, default is 1000ms
    const throttle = (cb, delay = 1000) => {

        // Flag to check if the function is waiting to execute again
        let shouldWait = false

        // Arguments to the function that is waiting to be executed
        let waitingArgs

        // Timeout function that executes the waiting function
        const timeoutFunc = () => {

            // If no waiting arguments exist, clear the waiting flag
            if (waitingArgs == null) {
                shouldWait = false
            } else {
                // Execute the waiting function with its arguments, clear waitingArgs, and set a new timeout
                cb(...waitingArgs)
                waitingArgs = null
                setTimeout(timeoutFunc, delay)
            }
        }

        // Return a new function that can be used in place of the original callback function
        return (...args) => {

            // If shouldWait flag is true, store the arguments and return early
            if (shouldWait) {
                waitingArgs = args
                return
            }

            // Execute the original callback function with its arguments, set the waiting flag to true, and set a timeout for the next execution
            cb(...args)
            shouldWait = true
            setTimeout(timeoutFunc, delay)
        }
    }


    // throttle update typing status
    const updateTypingStatus = throttle(() => {
        socket.emit(EVENTS.TYPING, localStorage.getItem('username'), localStorage.getItem('roomId'))
    })

    // throttle update activity status
    const updateActivityStatus = throttle(() => {

        if (localStorage.getItem('username') && localStorage.getItem('roomId')) {
            socket.emit(EVENTS.UPDATE_STATUS, "active")
        }

    })

    // user typing handler
    const typingHandler = (event) => {
        updateTypingStatus()
    }


    // This is an IIFE closure that returns a function used to reset the client's idle timer
    const resetIdleTimer = (() => {

        let timeout

        return (socket) => {

            // clear the previous timeout
            clearTimeout(timeout)

            // return if client is not in a chat room
            if (!localStorage.getItem('username') || !localStorage.getItem('roomId')) {
                return
            }

            // set a timeout to emit an update status event to the server to indicate
            // that the client is 'idle'
            timeout = setTimeout(() => {

                if (localStorage.getItem('username') && localStorage.getItem('roomId')) {

                    socket.emit(EVENTS.UPDATE_STATUS, "idle")

                }

            }, 5000)
        }
    })()

    // client activity handler to reset the idle timer and send an event to the server
    // to indicate that the client is 'active'
    const resetIdleTimerHandler = (event) => {

        resetIdleTimer(event.data.socket)
        updateActivityStatus()

    }

    localStorage.removeItem('username')
    localStorage.removeItem('roomId')

    // register DOM handlers
    $(selectors.createRoomButton).on('click', { socket: socket }, createRoomHandler)
    $(selectors.joinRoomForm).on('submit', { socket: socket }, joinRoomHandler)
    $(selectors.chatRoomLeaveButton).on('click', { socket: socket }, leaveRoomHandler)
    $(selectors.messageForm).on('submit', { socket: socket }, sendMessageHandler)
    $(selectors.messageInput).on("keydown", { socket: socket }, enterKeyPressedHandler)
    $(selectors.messageInput).on('input', typingHandler)
        // activity event handlers
    $(document).on("mousemove", { socket: socket }, resetIdleTimerHandler)
    $(document).on("keydown", { socket: socket }, resetIdleTimerHandler)
    $(document).on("touchstart", { socket: socket }, resetIdleTimerHandler)

    // start an idle timer
    resetIdleTimer(socket)
}

