const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { signToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: String(email || "").toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password || "", admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({
    id: admin._id,
    email: admin.email,
    role: admin.role,
    name: admin.name
  });

  res.json({
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
};