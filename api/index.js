const serverless = require("serverless-http");
const { app, boot } = require("./app");

const handler = serverless(app);

module.exports = async (req, res) => {
  await boot();
  return handler(req, res);
};