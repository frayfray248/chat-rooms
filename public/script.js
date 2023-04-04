const createRoomHandler = (event) => {
    event.preventDefault()

    const socket = event.data.socket
    
    socket.emit('createRoom')

}

const joinRoomHandler = (event) => {
    event.preventDefault()

    const socket = event.data.socket
    const key = $('#roomKeyInput').val()
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


$(function () {

    var socket = io();

    // elements
    const $createRoomButton = $('#createRoomButton')
    const $joinRoomForm = $('#joinRoomForm')
    const $chatRoom = $('#chatRoom')
    const $chatRoomKey = $('#chatRoomKey')
    const $messageForm = $('#messageForm')
    const $chatWindow = $('#chatWindow')



    // handlers
    $joinRoomForm.on('submit', { socket : socket},  joinRoomHandler)
    $createRoomButton.on('click', { socket : socket},  createRoomHandler)
    $messageForm.on('submit', { socket: socket },  sendMessageHandler)

    // socket
    socket.on("sendRoomId", key => {
        console.log(key)

        $('#roomKeyInput').val(key)

    })

    socket.on("sendRoom", room => {
        
        // show chat room gui
        $joinRoomForm.hide()
        $chatRoom.show()
        $chatRoomKey.html(`Room: ${room.id}`)

        // store room and username
        localStorage.setItem('roomKey', room.id)
        localStorage.setItem('username', $('#usernameInput').val())
    })


    socket.on("roomNotFound", key => {
        alert(`Room ${key} not found`)
    })

    socket.on('newMessage', (message, username) => {
        

        $chatWindow.append(`<span>${username}: ${message}</span><br>`)

    })



})