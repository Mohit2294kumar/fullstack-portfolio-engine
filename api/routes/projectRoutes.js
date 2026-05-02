const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;