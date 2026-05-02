const router = require("express").Router();
const auth = require("../middleware/auth");
const { createMessage, getMessages, deleteMessage } = require("../controllers/messageController");

router.post("/", createMessage);
router.get("/", auth, getMessages);
router.delete("/:id", auth, deleteMessage);

module.exports = router;