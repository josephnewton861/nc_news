const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics");
const { handles405s } = require("../error-handling/errors");

topicsRouter.route("/").get(getTopics).all(handles405s);

module.exports = topicsRouter;
