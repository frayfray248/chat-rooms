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

$(function () {

    var socket = io();

    // elements
    const $createRoomButton = $('#createRoomButton')
    const $joinRoomForm = $('#joinRoomForm')
    const $chatRoom = $('#chatRoom')
    const $chatRoomKey = $('#chatRoomKey')

    // handlers
    $joinRoomForm.on('submit', { socket : socket},  joinRoomHandler)
    $createRoomButton.on('click', { socket : socket},  createRoomHandler)

    // socket
    socket.on("sendKey", key => {
        console.log(key)

        $('#roomKeyInput').val(key)

    })

    socket.on("sendRoom", key => {
        
        $joinRoomForm.hide()
        $chatRoom.show()

        $chatRoomKey.html(`Room: ${key}`)

    })

    socket.on("roomNotFound", key => {
        alert(`Room ${key} not found`)
    })



})