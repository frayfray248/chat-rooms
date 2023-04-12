// Chat Room Component
// returns an object of functions to control
// the Chat Room view

const chatRoom = (() => {

    // check if the client's chat window is scrolled at the buttom
    const chatWindowAtBottom = () => {

        const chatWindow = $(selectors.chatWindow)
        const scrollHeight = chatWindow.prop('scrollHeight')
        const clientHeight = chatWindow.prop('clientHeight')
        const scrollTop = chatWindow.prop('scrollTop')

        return scrollHeight - clientHeight <= scrollTop +1
    }

    // scroll the chat window to the buttom
    const scrollDown = () => {

        const chatWindow = $(selectors.chatWindow)
        chatWindow.scrollTop(chatWindow.prop('scrollHeight'))

    }

    // add a message to the chat window and scroll the chat window
    // down to show the new message. This for when the chat window is 
    // overflowed. Auto scrolling only happens if the chat window was
    // already scrolled to the bottom
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

    // show the chat room
    const show = () => {

        $(selectors.chatRoom).css("display", "flex")

    }

    // hide the chat room
    const hide = () => {

        $(selectors.chatRoom).css("display", "none")

    }

    // clear the chat room's data
    const clear = () => {

        $(selectors.chatWindowMessages).empty()
        $(selectors.chatRoomUsersList).empty()
        $(selectors.chatRoomId).empty()

    }

    // render an array of messages to the chat window
    const renderMessages = (messages) => {

        const chatWindowMessages = $(selectors.chatWindowMessages)

        chatWindowMessages.empty()

        for (const message of messages) {
            appendMessage(message.text, message.username)
        }
    }

    // add a user to the users list side menu and indicate if the user is the current client
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

    // render an array of users 
    const renderUsersList = (users) => {

        // clear user list
        $(selectors.chatRoomUsersList).empty()

        // add each user
        for (const user of users) {

            const isClient = user.username === localStorage.getItem('username')

            addUser(user, isClient)

        }

    }

    // remove a user from the users list
    const removeUser = (username) => {

        $(selectors.userListItem(username)).remove()

    }

    // inject data into the chat room
    const setUp = (roomId, messages, users) => {

        renderUsersList(users)

        $(selectors.chatRoomId).html(`Room: ${roomId}`)

        renderMessages(messages)

    }

    // update a user's activity status
    const updateUserStatus = (username, status) => {

        $(selectors.userStatus(username)).attr('class', `users-list-status-light ${status}`)

    }

    // show or hide a user's typing indicator
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