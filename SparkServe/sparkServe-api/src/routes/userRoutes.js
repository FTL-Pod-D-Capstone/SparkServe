const express = require("express"); //Importing and Initializing Express
const router = express.Router();
const userController = require("../controllers/userControllers");

// get all the Users
router.get("/", userController.getAllUsers);
//get Users by ID
router.get("/:id", userController.getUsersById);
//add a new Users
router.post("/", userController.createUsers);
//update Users
router.put("/:id", userController.updateUser);
//delete a Users
router.delete("/", userController.deleteUsers);

module.exports = router;