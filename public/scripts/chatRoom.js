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

    const renderMessages = (messages) => {

        const chatWindowMessages = $(selectors.chatWindowMessages)

        chatWindowMessages.empty()

        for (const message of messages) {
            appendMessage(message.text, message.username)
        }
    }

    const renderUsersList = (users) => {

        const chatRoomUsersList = $(selectors.chatRoomUsersList)
        chatRoomUsersList.empty()

        for (const user of users) {

            const isClient = user === localStorage.getItem('username', user)

            const userListItem = `
            <li class="user-item" >
                <span class="users-list-status-light active"></span>
                <span class="users-list-user">${user} ${isClient ? "(You)" : ""}</span>
            </li>
            `

            if (isClient) {
                chatRoomUsersList.prepend(userListItem)
            }
            else {
                chatRoomUsersList.append(userListItem)
            }
        }

    }

    const setUp = (room, username) => {

        renderUsersList(room.users)

        $(selectors.chatRoomUsernameTitle).html(`Room: ${room.id}`)

        $(selectors.chatRoomId).html(`Room: ${room.id}`)

        renderMessages(room.messages)

    }

    return {
        appendMessage : appendMessage,
        show : show,
        setUp : setUp,
        hide : hide,
        renderUsersList : renderUsersList,
        renderMessages: renderMessages
    }

})()