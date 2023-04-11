const joinRoomForm = (() => {

    const show = () => {

        $(selectors.joinRoomForm).show()

    }

    const hide = () => {

        $(selectors.joinRoomForm).hide()

    }

    const clear = () => {

        $(selectors.roomIdInput).val('')
        $(selectors.usernameInput).val('')

    }

    const setRoomIdInput = (text) => {

        $(selectors.roomIdInput).val(text)

    }

    const getRoomIdInput = () => {

        return $(selectors.roomIdInput).val()

    }

    const getUsernameInput = () => {

        return $(selectors.usernameInput).val()

    }


    return {
        show : show,
        hide : hide,
        clear : clear,
        getRoomIdInput : getRoomIdInput,
        getUsernameInput : getUsernameInput,
        setRoomIdInput : setRoomIdInput
    }

})()