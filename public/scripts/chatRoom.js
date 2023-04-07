const chatRoom = (() => {

    const appendMessage = (text, username) => {
        $(selectors.chatWindow).append(`<span>${username}: ${text}</span><br>`)
    }

    const show = () => {

        $(selectors.chatRoom).css("display", "flex")

    }

    const hide = () => {

        $(selectors.chatRoom).css("display", "none")

    }

    const setUp = (room, username) => {

        $(selectors.chatRoomUsernameTitle).html(`Room: ${room.id}`)

        $(selectors.chatRoomId).html(`Room: ${room.id}`)

        for (const message of room.messages) {
            appendMessage(message.text, message.username)
        }

    }

    return {
        appendMessage : appendMessage,
        show : show,
        setUp : setUp,
        hide : hide
    }

})()