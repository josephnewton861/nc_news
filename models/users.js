const connection = require('../db/connection')

exports.fetchUserByUsername = (username) => {
    return connection.select('*')
    .from('users')
    .where("users.username", username)
    .then((user) => {
        // console.log(user[0])
        return user[0]
    })
}