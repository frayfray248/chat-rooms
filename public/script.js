const createRoomHandler = (event) => {
    event.preventDefault()

    const socket = event.data.socket
    
    socket.emit('createRoom')

}

$(function () {

    var socket = io();

    $('#createRoomButton').on('click', { socket : socket},  createRoomHandler)

    socket.on("sendKey", key => {
        console.log(key)

        $('#roomKeyInput').val(key)

    })



})