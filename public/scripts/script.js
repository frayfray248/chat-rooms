$(function () {

    ;(async () => {
        try {

            const response = await fetch('/events')
            const events = await response.json()

            console.log(events)

            var socket = io();
            registerDOMHandlers(socket, events)
            registerSocketHandlers(socket, events)

        } catch(error) {
            alert(error.message)
        }
    })()


})