const connection = require('../db/connection')

exports.fetchUserByUsername = (username) => {
    return connection.select('*')
    .from('users')
    .where("users.username", username)
    .then((user) => {
        if(!user.length) {
           return Promise.reject({status: 404, msg: `Valid input, however username ${username} does not exist in database`})
        } else 
        return user[0]
    })
}