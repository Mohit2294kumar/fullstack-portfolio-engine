const serverless = require("serverless-http");
const { app, boot } = require("./app");

let isBooted = false;

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    if (!isBooted) {
      await boot();   // run only once
      isBooted = true;
      console.log("Boot completed");
    }

    return handler(req, res);
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({
      ok: false,
      message: "Server failed to start"
    });
  }
};