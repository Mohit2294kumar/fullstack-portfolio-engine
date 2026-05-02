const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
} = require("../controllers/experienceController");

router.get("/", getExperience);
router.post("/", auth, createExperience);
router.put("/:id", auth, updateExperience);
router.delete("/:id", auth, deleteExperience);

module.exports = router;