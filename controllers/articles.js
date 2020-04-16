const {fetchArticlesByArticleId, updateArticlesByArticleId, fetchArticles} = require('../models/articles')
const {addCommentsByArticleId, fetchCommentsByArticleId} = require('../models/comments')

exports.getArticlesByArticleId = (req, res, next) => {
    const {article_id} = req.params
    fetchArticlesByArticleId(article_id).then((articles) => {
        res.status(200).send({articles})
    }).catch(next)
}

exports.patchArticlesByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body

    updateArticlesByArticleId(article_id, inc_votes).then((article) => {
        res.status(200).send({article})
    }).catch(next)
}

exports.postCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const body = req.body

    addCommentsByArticleId(article_id, body).then((comments) => {
        res.status(201).send({comments})
    }).catch(next)
}

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const {sort_by} = req.query
    const {order} = req.query



    // console.log(article_id)
    fetchCommentsByArticleId(article_id, sort_by, order).then((comments) => {
        res.status(200).send({comments})
    }).catch(next)
}

exports.getArticles = (req, res, next) => {
    const {sort_by} = req.query
    const {order} = req.query
    
    fetchArticles(sort_by, order).then((articles) => {
        res.status(200).send({articles})
    }).catch(next)
}