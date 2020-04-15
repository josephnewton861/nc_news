const connection = require('../db/connection')


exports.addCommentsByArticleId = (body, article_id) => {
   console.log(body)
   console.log(article_id)
}

//Insert body into comments where articles.article_id = article_id retuning ('*')

exports.fetchCommentsByArticleId = (article_id, sort_by = 'created_at', order) => {
    return connection.select('*')
    .from('comments')
    .where('article_id', article_id)
    .orderBy(sort_by)
    .modify((query) => {
        if(query === undefined) query.where(order, 'desc')
    })
    .then((comments) => {
        if(!comments.length) {
            return Promise.reject({status: 404, msg: `article_id ${article_id} does not exist in database`})
        } else 
        // console.log(comments)
        return comments
    })
}