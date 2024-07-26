const express = require("express");
const router = express.Router();
// Import controller
const { chatHandler, getChatHistory } = require("../controllers/chatbotControllers");

// Call the controller
router.post("/", chatHandler);
router.get("/history/:userId", getChatHistory);


module.exports = router;
