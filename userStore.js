/*

    This module holds a map that links socket IDs to user data. 

*/


const users = new Map()

const add = (id, user) => {

    users.set(id, user)

}

const remove = (id) => {

    users.delete(id)

}

const get = (id) => {

    return users.get(id)

}

module.exports = {
    add : add,
    remove : remove,
    get : get
}