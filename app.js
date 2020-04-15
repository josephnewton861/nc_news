const express = require('express')
const app = express()
const apiRouter = require('./routes/api')
const {handlesCustoms, handles500s} = require('./error-handling/errors')


app.use('/api', apiRouter)



//DEFAULT CONTROLLER FOR INVALID PATHS
app.all('/*', (req, res, next) => {
    res.status(404).send({msg: 'Path not found'})
})

app.use(handlesCustoms)
app.use(handles500s)

module.exports = app