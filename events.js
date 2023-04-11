// client
exports.CREATE_ROOM = "CREATE_ROOM"
exports.JOIN_ROOM = "JOIN_ROOM"
exports.LEAVE_ROOM = "LEAVE_ROOM"
exports.UPDATE_STATUS = "UPDATE_STATUS"
exports.TYPING = "TYPING"

// server
exports.SEND_ROOM_ID = "SEND_ROOM_ID"
exports.SHOW_ROOM = "SHOW_ROOM"
exports.CLOSE_ROOM = "CLOSE_ROOM"
exports.USER_JOINED = "USER_JOINED"
exports.USER_LEFT = "USER_LEFT"
exports.UPDATE_USER_STATUS = "UPDATE_USER_STATUS"
exports.USER_TYPING = "USER_TYPING"

// server error events
exports.ROOM_NOT_FOUND = "ROOM_NOT_FOUND"
exports.ERROR = "ERROR"

// shared
exports.SEND_MESSAGE = "SEND_MESSAGE"