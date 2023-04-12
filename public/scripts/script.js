// main entrypoint script

$(function () {

    ;(async () => {
        try {

            // get event names from server
            const response = await fetch('/events')
            const events = await response.json()

            // connect to server socket
            var socket = io();

            // register DOM handlers
            registerDOMHandlers(socket, events)

            // register socket handlers
            registerSocketHandlers(socket, events)

        } catch(error) {
            alert(error.message)
        }
    })()


})