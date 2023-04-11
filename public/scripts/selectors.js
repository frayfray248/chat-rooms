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