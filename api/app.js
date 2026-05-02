require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");

const connectDB = require("./db");
const Admin = require("./models/Admin");
const Project = require("./models/Project");
const Experience = require("./models/Experience");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

async function seedDefaults() {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: "admin"
    });
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: "AI Resume Matcher",
        description: "A resume matching system that compares job descriptions and resumes with smart scoring.",
        tech: ["React", "Flask", "Python", "MongoDB"],
        features: ["Resume upload", "Job matching score", "Ranking view"],
        live: "",
        github: ""
      },
      {
        title: "Career Path Recommender",
        description: "A recommendation system that suggests careers, jobs, and courses based on user profile.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        features: ["Skill analysis", "Career suggestions", "Course mapping"],
        live: "",
        github: ""
      },
      {
        title: "Smart Utility Dashboard",
        description: "A productivity dashboard with chat, summarization, translation, and email generation modules.",
        tech: ["React", "Node.js", "API Integration"],
        features: ["Chat box", "Text tools", "Dashboard analytics"],
        live: "",
        github: ""
      }
    ]);
  }

  const experienceCount = await Experience.countDocuments();
  if (experienceCount === 0) {
    await Experience.insertMany([
      {
        title: "Full Stack Web Development Internship",
        period: "2025",
        description: "Built and deployed multiple React and Node.js projects with responsive UI."
      },
      {
        title: "Cloud Virtual Internship",
        period: "2025",
        description: "Worked with AWS concepts, deployment, storage, monitoring, and serverless systems."
      },
      {
        title: "AICTE / Industry Project Work",
        period: "2025",
        description: "Developed production-style academic and portfolio applications with clean structure."
      }
    ]);
  }
}

let bootPromise = null;

async function boot() {
  if (!bootPromise) {
    bootPromise = (async () => {
      await connectDB();
      await seedDefaults();
    })();
  }
  return bootPromise;
}

module.exports = { app, boot };