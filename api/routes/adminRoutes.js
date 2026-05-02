const router = require("express").Router();
const auth = require("../middleware/auth");
const { dashboard } = require("../controllers/adminController");

router.get("/dashboard", auth, dashboard);

module.exports = router;