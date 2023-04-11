const chatRoom = (() => {

    const chatWindowAtBottom = () => {

        const chatWindow = $(selectors.chatWindow)
        const scrollHeight = chatWindow.prop('scrollHeight')
        const clientHeight = chatWindow.prop('clientHeight')
        const scrollTop = chatWindow.prop('scrollTop')

        return scrollHeight - clientHeight <= scrollTop +1
    }

    const scrollDown = () => {

        const chatWindow = $(selectors.chatWindow)
        chatWindow.scrollTop(chatWindow.prop('scrollHeight'))

    }

    const appendMessage = (text, username) => {

        const chatWindowMessages = $(selectors.chatWindowMessages)
        const atBottom = chatWindowAtBottom()

        chatWindowMessages.append(
            `
        <li class="chatroom-message">
            <div>${username}</div>
            <p class="chatroom-message-text">${text}</p>
        </li>
        `)

        if (atBottom) scrollDown()

    }

    const show = () => {

        $(selectors.chatRoom).css("display", "flex")

    }

    const hide = () => {

        $(selectors.chatRoom).css("display", "none")

    }

    const clear = () => {

        $(selectors.chatWindowMessages).empty()
        $(selectors.chatRoomUsersList).empty()
        $(selectors.chatRoomId).empty()

    }

    const renderMessages = (messages) => {

        const chatWindowMessages = $(selectors.chatWindowMessages)

        chatWindowMessages.empty()

        for (const message of messages) {
            appendMessage(message.text, message.username)
        }
    }

    const addUser = (user, isClient) => {

        const chatRoomUsersList = $(selectors.chatRoomUsersList)

        const userListItem = `
            <li id=${user.username}ListItem class="user-item" >
                <span id="${user.username}Status" class="users-list-status-light ${user.status}"></span>
                <span class="users-list-user">${user.username} ${isClient ? "(You)" : ""}</span>
                <span id="${user.username}Typing" style="display: none;">typing...</span>
            </li>
            `

        if (isClient) {
            chatRoomUsersList.prepend(userListItem)
        }
        else {
            chatRoomUsersList.append(userListItem)
        }

    }

    const renderUsersList = (users) => {

        // clear user list
        $(selectors.chatRoomUsersList).empty()

        // add each user
        for (const user of users) {

            const isClient = user.username === localStorage.getItem('username')

            addUser(user, isClient)

        }

    }

    const removeUser = (username) => {

        $(selectors.userListItem(username)).remove()

    }

    const setUp = (roomId, messages, users) => {

        renderUsersList(users)

        $(selectors.chatRoomId).html(`Room: ${roomId}`)

        renderMessages(messages)

    }

    const updateUserStatus = (username, status) => {

        $(selectors.userStatus(username)).attr('class', `users-list-status-light ${status}`)

    }

    const showUserTyping = (username, show) => {

        if (show) {
            $(selectors.userTyping(username)).show()
        }
        else {
            $(selectors.userTyping(username)).hide()
        }
    }


    return {
        appendMessage: appendMessage,
        show: show,
        setUp: setUp,
        hide: hide,
        clear: clear,
        renderUsersList: renderUsersList,
        renderMessages: renderMessages,
        updateUserStatus: updateUserStatus,
        showUserTyping: showUserTyping,
        addUser : addUser,
        removeUser : removeUser
    }

})()