const express = require("express"); // Importing and Initializing Express
const router = express.Router();
const userController = require("../controllers/userControllers");
const { register, login } = require("../controllers/userControllers");


// Get all the Users
router.get("/", userController.getAllUsers);

// Get User by ID
router.get("/:id", userController.findUserById);

// Add a new User
// router.post("/", userController.createUser);

// Register a new User
router.post("/register", register);

// Login a User
router.post("/login", login);

// Update User
router.put("/:id", userController.updateUser);

// Delete User
router.delete("/:id", userController.deleteUsers);

module.exports = router;
