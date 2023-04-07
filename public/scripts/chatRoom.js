const chatRoom = (() => {

    const appendMessage = (text, username) => {

        const chatWindowMessages = $(selectors.chatWindowMessages)


        chatWindowMessages.append(
        `
        <li class="chatroom-message">
            <div>${username}</div>
            <p class="chatroom-message-text">${text}</p>
        </li>
        `)

    }

    const show = () => {

        $(selectors.chatRoom).css("display", "flex")

    }

    const hide = () => {

        $(selectors.chatRoom).css("display", "none")

    }

    const renderUsersList = (users) => {

        const chatRoomUsersList = $(selectors.chatRoomUsersList)
        chatRoomUsersList.empty()

        for (const user of users) {
            chatRoomUsersList.append(`
            <li class="user-item" >
                <span class="users-list-status-light active"></span>
                <span class="users-list-user">${user}</span>
            </li>
            `)
        }

    }

    const setUp = (room, username) => {

        renderUsersList(room.users)

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
        hide : hide,
        renderUsersList : renderUsersList
    }

})()