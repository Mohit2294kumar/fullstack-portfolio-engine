const Message = require("../models/Message");

exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({ name, email, message });
    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (err) {
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};