const apiRouter = require('express').Router()
const topicsRouter = require('../routes/topics')
const usersRouter = require('../routes/users')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', usersRouter)

module.exports = apiRouter