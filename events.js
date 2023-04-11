// client events
exports.CREATE_ROOM = "CREATE_ROOM"
exports.JOIN_ROOM = "JOIN_ROOM"
exports.LEAVE_ROOM = "LEAVE_ROOM"
exports.SEND_MESSAGE = "SEND_MESSAGE"
exports.TYPING = "TYPING"
exports.UPDATE_STATUS = "UPDATE_STATUS"


// server events
exports.SEND_ROOM_ID = "SEND_ROOM_ID"
exports.SEND_ROOM = "SEND_ROOM"
exports.SEND_MESSAGE = "SEND_MESSAGE"
exports.UPDATE_USERS = "UPDATE_USERS"
exports.USER_JOINED = "USER_JOINED"
exports.UPDATE_USER_STATUS = "UPDATE_USER_STATUS"
exports.USER_LEFT = "USER_LEFT"
exports.UPDATE_MESSAGES = "UPDATE_MESSAGES"
exports.USER_TYPING = "USER_TYPING"
exports.SHOW_ROOM = "SHOW_ROOM"
exports.CLOSE_ROOM = "CLOSE_ROOM"

// server error events
exports.ROOM_NOT_FOUND = "ROOM_NOT_FOUND"
exports.ERROR = "ERROR"