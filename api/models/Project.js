const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String }],
    features: [{ type: String }],
    live: { type: String, default: "" },
    github: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);