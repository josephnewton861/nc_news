const connection = require("../db/connection");

exports.fetchArticlesByArticleId = (article_id) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", article_id)
    .then((articles) => {
      if (!articles.length) {
        return Promise.reject({
          status: 404,
          msg: `id ${article_id} does not exist in database`,
        });
      } else return articles[0];
    });
};

exports.updateArticlesByArticleId = (article_id, inc_votes) => {
  return connection
    .from("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then((article) => {
      if (!article.length) {
        return Promise.reject({
          status: 404,
          msg: `article_id ${article_id} does not exist in database`,
        });
      } else return article[0];
    });
};

exports.fetchArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify((query) => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .orderBy(sort_by, "asc", order)
    .returning("*")
    .then((articles) => {
      return articles;
    });
};
