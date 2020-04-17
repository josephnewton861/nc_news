const commentsRouter = require("express").Router();
const {
  patchCommentsByCommentId,
  deleteCommentsByCommentId,
} = require("../controllers/comments");
const { handles405s } = require("../error-handling/errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentsByCommentId)
  .delete(deleteCommentsByCommentId)
  .all(handles405s);

module.exports = commentsRouter;
