const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topics");
const usersRouter = require("../routes/users");
const articlesRouter = require("../routes/articles");
const commentsRouter = require("../routes/comments");
const endpointsInfoString = require("../endpoints-info");

apiRouter.get("/", (req, res, next) => res.send({ msg: endpointsInfoString }));

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
