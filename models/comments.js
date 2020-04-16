const connection = require('../db/connection')


exports.addCommentsByArticleId = (article_id, body) => {
 
    const addedComment = {};
    addedComment.author = body.username;
    addedComment.body = body.body;
    addedComment.article_id = article_id;

    console.log(addedComment)
  
    return connection('comments')
      .insert(addedComment)
      .returning('*')
      .then(comments => {
        console.log(comments)
      });
  };




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

exports.updateCommentsByCommentId = (comment_id, inc_votes) => {

    return connection('comments')
    .where('comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then((comment) => {
        if(!comment.length) {
            return Promise.reject({status: 404, msg: `comment_id ${comment_id} does not exist in database`})
        } else 
        // console.log(comment[0])
        return comment[0]
    })
}

exports.removeCommentsByCommentId = (comment_id) => {
    return connection('comments')
    .where('comment_id', comment_id)
    .del()
}