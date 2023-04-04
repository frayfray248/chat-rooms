const selectors = {
    joinRoomForm :  '#joinRoomForm',
    createRoomButton : '#createRoomButton',
    messageForm : '#messageForm',
    chatRoom : '#chatRoom',
    chatRoomId : '#chatRoomId',
    chatWindow : '#chatWindow',
    roomIdInput : '#roomIdInput'
}

const chatRoom = (() => {

    const appendMessage = (text, username) => {
        $(selectors.chatWindow).append(`<span>${username}: ${text}</span><br>`)
    }

    const show = () => {

        $(selectors.chatRoom).show()

    }

    const setUp = (room) => {

        $(selectors.chatRoomId).html(`Room: ${room.id}`)

        for (const message of room.messages) {
            appendMessage(message.text, message.username)
        }

    }

    return {
        appendMessage : appendMessage,
        show : show,
        setUp : setUp
    }

})()

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

const registerSocketHandlers = (socket) => {

    const sendRoomId = (roomId) => {

        $(selectors.roomIdInput).val(roomId)

    }

    const sendRoom = (room) => {

        // show chat room gui
        $(selectors.joinRoomForm).hide()
        chatRoom.setUp(room)
        chatRoom.show()

        // store room and username
        localStorage.setItem('roomKey', room.id)
        localStorage.setItem('username', $('#usernameInput').val())

    }

    const roomNotFound = (roomId) => {

        alert(`Room ${roomId} not found`)

    }

    const newMessage = (text, username) => {

        chatRoom.appendMessage(text, username)

    }

    socket.on("sendRoomId", sendRoomId)
    socket.on("sendRoom", sendRoom)
    socket.on("roomNotFound", roomNotFound)
    socket.on("newMessage", newMessage)

}


$(function () {

    var socket = io();

    registerDOMHandlers(socket)
    registerSocketHandlers(socket)
})