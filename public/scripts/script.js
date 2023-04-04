$(function () {

    var socket = io();

    registerDOMHandlers(socket)
    registerSocketHandlers(socket)
})