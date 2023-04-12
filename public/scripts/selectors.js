// This script contains DOM query selectors to be used by jQuery
// some of these selectors are functions that return a selector
// based on provided arguments

const selectors = {
    joinRoomForm :  '#joinRoomForm',
    createRoomButton : '#createRoomButton',
    messageForm : '#messageForm',
    chatRoom : '#chatRoom',
    chatRoomId : '#chatRoomId',
    chatWindow : '#chatWindow',
    roomIdInput : '#roomIdInput',
    usernameInput : '#usernameInput',
    chatRoomUsernameTitle : '#chatRoomUsernameTitle',
    chatRoomUsersList : '#chatRoomUsersList',
    chatWindowMessages : '#chatWindowMessages',
    messageInput : "#messageInput",
    userTyping : (username) => `#${username}Typing`,
    userStatus : (username) => `#${username}Status`,
    userListItem : (username) => `#${username}ListItem`,
    chatRoomLeaveButton : '#chatRoomLeaveButton'
}