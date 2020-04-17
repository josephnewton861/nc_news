const connection = require("../db/connection");

exports.addCommentsByArticleId = (article_id, body) => {
  const addedComment = {};
  addedComment.author = body.username;
  addedComment.body = body.body;
  addedComment.article_id = article_id;

  return connection("comments")
    .insert(addedComment)
    .returning("*")
    .then((comments) => {
      if (!comments.length) {
        return Promise.reject({
          status: 404,
          msg: `article_id ${article_id} does not exist in database`,
        });
      } else return comments[0];
    });
};

exports.fetchCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .then((comments) => {
      if (!comments.length) {
        return Promise.reject({
          status: 404,
          msg: `article_id ${article_id} does not exist in database`,
        });
      } else return comments;
    });
};

exports.updateCommentsByCommentId = (comment_id, inc_votes) => {
  if (inc_votes === undefined) {
    return connection("comments")
      .where("comment_id", comment_id)
      .returning("*")
      .then((comment) => {
        if (!comment.length) {
          return Promise.reject({
            status: 404,
            msg: `comment_id ${comment_id} does not exist in database`,
          });
        } else return comment[0];
      });
  } else {
    return connection("comments")
      .where("comment_id", comment_id)
      .increment("votes", inc_votes)
      .returning("*")
      .then((comment) => {
        if (!comment.length) {
          return Promise.reject({
            status: 404,
            msg: `comment_id ${comment_id} does not exist in database`,
          });
        } else return comment[0];
      });
  }
};

exports.removeCommentsByCommentId = (comment_id) => {
  return connection("comments")
    .where("comment_id", comment_id)
    .del()
    .then((delCount) => {
      if (delCount === 0)
        return Promise.reject({
          status: 404,
          msg: `comment_id ${comment_id} does not exist in database`,
        });
    });
};
