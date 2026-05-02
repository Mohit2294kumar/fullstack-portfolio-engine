const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", ExperienceSchema);