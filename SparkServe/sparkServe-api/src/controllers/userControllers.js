const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get user by ID
const findUserById = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register User
const register = async (req, res) => {
  const { username, email, phoneNumber, password,firstName,lastName } = req.body;
  try {
    // Check if user already exists by username, email, or phone number
    const existingUser =
      (await userModel.findUserByUsername(username)) ||
      (await userModel.findUserByEmail(email)) ||
      (await userModel.findUserByPhoneNumber(phoneNumber));

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username, email, or phone number already exists" });
    }

    // Hash the password using bcrypt and salt factor 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password
    const user = await userModel.createUser({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Register Error: ", error); // Log the detailed error for debugging
    res.status(400).json({ error: error.message || "User register error" });
  }
};

// Function to login user
const login = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;
  let user;

  if (username) {
    user = await userModel.findUserByUsername(username);
  } else if (email) {
    user = await userModel.findUserByEmail(email);
  } else if (phoneNumber) {
    user = await userModel.findUserByPhoneNumber(phoneNumber);
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    // create a json web token
    const token = jwt.sign(
      { userId: user.userId, username: user.username }, //as a token encode info and respond to the client
      process.env.JWT_SECRET_KEY //setup env variable for secret key
    );
    res.status(200).json({ token, userId: user.userId });
  } else {
    res.status(401).json({ error: "Invalid Credentials" });
  }
};

// Function to update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to delete user
const deleteUsers = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUsers(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user: deletedUser,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export the functions
module.exports = {
  getAllUsers,
  findUserById,
  register,
  updateUser,
  deleteUsers,
  login,
};
