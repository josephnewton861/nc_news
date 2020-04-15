const articleRouter = require('express').Router()
const {getArticlesByArticleId, patchArticlesByArticleId, postCommentsByArticleId, getCommentsByArticleId} = require('../controllers/articles')

articleRouter.route('/:article_id')
.get(getArticlesByArticleId)
.patch(patchArticlesByArticleId)

articleRouter.route('/:article_id/comments')
.post(postCommentsByArticleId)
.get(getCommentsByArticleId)

module.exports = articleRouter