const express = require("express");
const router = express.Router();
// Import controller
const { chatHandler } = require("../controllers/chatbotControllers");

// Call the controller
router.post("/", chatHandler);

module.exports = router;
