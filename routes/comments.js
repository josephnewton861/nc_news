const commentsRouter = require('express').Router()
const {patchCommentsByCommentId} = require('../controllers/comments')

commentsRouter.route('/:comment_id').patch(patchCommentsByCommentId)


module.exports = commentsRouter