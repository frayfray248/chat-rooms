// Join Room Form component
// returns an object of functions to control
// the Join Room Form

const joinRoomForm = (() => {

    // show the form
    const show = () => {

        $(selectors.joinRoomForm).show()

    }

    // hide the form
    const hide = () => {

        $(selectors.joinRoomForm).hide()

    }

    // clear input data
    const clear = () => {

        $(selectors.roomIdInput).val('')
        $(selectors.usernameInput).val('')

    }

    // set room id input data
    const setRoomIdInput = (text) => {

        $(selectors.roomIdInput).val(text)

    }

    // get room id input 
    const getRoomIdInput = () => {

        return $(selectors.roomIdInput).val()

    }

    // get username input
    const getUsernameInput = () => {

        return $(selectors.usernameInput).val()

    }


    // functions
    return {
        show : show,
        hide : hide,
        clear : clear,
        getRoomIdInput : getRoomIdInput,
        getUsernameInput : getUsernameInput,
        setRoomIdInput : setRoomIdInput
    }

})()