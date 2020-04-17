const ENV = process.env.NODE_ENV || "development";

const { test } = require("../data/test-data");
const { development } = require("../data/development-data");

const data = {
  development: development,
  test: test,
  production: development,
};

module.exports = data[ENV];
