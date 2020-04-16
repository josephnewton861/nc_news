const connection = require('../db/connection')

exports.fetchUserByUsername = (username) => {
    return connection.select('*')
    .from('users')
    .where({username})
    .returning('*')
    .then((user) => { 
        if(!user.length) {
            return Promise.reject({status: 404, msg: `username ${username} does not exist in database`})
        } else 
        return user[0]
    })
}