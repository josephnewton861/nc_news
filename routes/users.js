const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users");
const { handles405s } = require("../error-handling/errors");

usersRouter.route("/:username").get(getUserByUsername).all(handles405s);

module.exports = usersRouter;
