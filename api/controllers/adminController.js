const Project = require("../models/Project");
const Experience = require("../models/Experience");
const Message = require("../models/Message");

exports.dashboard = async (req, res, next) => {
  try {
    const [projects, messages, experience] = await Promise.all([
      Project.countDocuments(),
      Message.find().sort({ createdAt: -1 }).limit(10),
      Experience.countDocuments()
    ]);

    res.json({
      stats: {
        projects,
        messages: messages.length,
        experience
      },
      messages
    });
  } catch (err) {
    next(err);
  }
};