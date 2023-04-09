const chatRoom = (() => {

    const updateTypingHandlers = new Map()
    const userStatus = {
        active : "active",
        idle : "idle",
        away : "away"
    }

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

            const isClient = user.username === localStorage.getItem('username')

            const userListItem = `
            <li class="user-item" >
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

            // update typing handler closure for user
            const updateTypingHandler = () => {

                let timeout

                return (username) => {

                    if (timeout) {

                        clearTimeout(timeout)

                    }

                    $(selectors.userTyping(username)).show()
                    console.log(`${username} is typing`)

                    timeout = setTimeout(() => {

                        $(selectors.userTyping(username)).hide()
                        timeout = null;

                    }, 1500)

                }
            }

            updateTypingHandlers.set(user.username, updateTypingHandler())

        }

    }

    const setUp = (room, username) => {

        renderUsersList(room.users)

        $(selectors.chatRoomUsernameTitle).html(`Room: ${room.id}`)

        $(selectors.chatRoomId).html(`Room: ${room.id}`)

        renderMessages(room.messages)

    }


    const updateTyping = (username) => {

        const handler = updateTypingHandlers.get(username)

        handler(username)

    }

    const updateUserStatus = (username, status) => {

        console.log(`${username} is now ${status}`)


        if (status === userStatus.active) {

            $(selectors.userStatus(username)).attr('class', 'users-list-status-light active')
            
        }
        else if (status === userStatus.idle) {

            $(selectors.userStatus(username)).attr('class', 'users-list-status-light idle')

        }
        else if (status === userStatus.away) {

            $(selectors.userStatus(username)).attr('class', 'users-list-status-light away')

        }

    }


    return {
        appendMessage: appendMessage,
        show: show,
        setUp: setUp,
        hide: hide,
        renderUsersList: renderUsersList,
        renderMessages: renderMessages,
        updateTyping: updateTyping,
        updateUserStatus : updateUserStatus
    }

})()