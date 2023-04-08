const registerDOMHandlers = (socket) => {

    const createRoomHandler = (event) => {
        event.preventDefault()

        const socket = event.data.socket

        socket.emit('createRoom')

    }

    const joinRoomHandler = (event) => {
        event.preventDefault()

        const socket = event.data.socket
        const key = $('#roomIdInput').val()
        const username = $('#usernameInput').val()

        socket.emit('joinRoom', key, username)
    }

    const leaveRoomHandler = (event) => {
       
        socket.emit('leaveRoom', localStorage.getItem('username'), localStorage.getItem('roomKey'))

    }

    const sendMessageHandler = (event) => {
        event.preventDefault()

        const message = $('#messageInput').val()

        if (!message) return

        const socket = event.data.socket
        const username = localStorage.getItem('username')
        const key = localStorage.getItem('roomKey')

        socket.emit('sendMessage', message, username, key)
        $('#messageInput').val("")

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
        socket.emit("typing", localStorage.getItem('username'), localStorage.getItem('roomKey'))
    })

    const typingHandler = (event) => {
        updateTypingStatus()
    }

    $(selectors.joinRoomForm).on('submit', { socket: socket }, joinRoomHandler)
    $(selectors.createRoomButton).on('click', { socket: socket }, createRoomHandler)
    $(selectors.messageForm).on('submit', { socket: socket }, sendMessageHandler)
    $(selectors.messageInput).on('input', typingHandler)
    $(selectors.chatRoomLeaveButton).on('click', { socket : socket }, leaveRoomHandler)

}