const articleRouter = require('express').Router()
const {getArticlesByArticleId, patchArticlesByArticleId, postCommentsByArticleId, getCommentsByArticleId, getArticles} = require('../controllers/articles')
const {handles405s} = require('../error-handling/errors')

articleRouter.route('/:article_id')
.get(getArticlesByArticleId)
.patch(patchArticlesByArticleId)

articleRouter.route('/:article_id/comments')
.post(postCommentsByArticleId)
.get(getCommentsByArticleId)

articleRouter.route('/').get(getArticles).all(handles405s)

module.exports = articleRouter