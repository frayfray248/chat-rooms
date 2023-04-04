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