const Experience = require("../models/Experience");

exports.getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json({ experience });
  } catch (err) {
    next(err);
  }
};

exports.createExperience = async (req, res, next) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json({ experience: item });
  } catch (err) {
    next(err);
  }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Experience not found" });
    res.json({ experience: item });
  } catch (err) {
    next(err);
  }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Experience not found" });
    res.json({ message: "Experience deleted" });
  } catch (err) {
    next(err);
  }
};