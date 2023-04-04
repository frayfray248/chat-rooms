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

    const sendMessageHandler = (event) => {
        event.preventDefault()

        const socket = event.data.socket
        const username = localStorage.getItem('username')
        const key = localStorage.getItem('roomKey')

        const message = $('#messageInput').val()

        socket.emit('sendMessage', message, username, key)

    }

    $(selectors.joinRoomForm).on('submit', { socket: socket }, joinRoomHandler)
    $(selectors.createRoomButton).on('click', { socket: socket }, createRoomHandler)
    $(selectors.messageForm).on('submit', { socket: socket }, sendMessageHandler)

}