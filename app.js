const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const {
  handles400s,
  handlesCustoms,
  handles500s,
  handles405s,
} = require("./error-handling/errors");

app.use(express.json());

app.use("/api", apiRouter);

//DEFAULT CONTROLLER FOR INVALID PATHS
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handles400s);
app.use(handlesCustoms);
app.use(handles500s);
app.use(handles405s);

module.exports = app;
