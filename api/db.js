const mongoose = require("mongoose");

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectDB;