const userModel = require("../models/userModels");
const { Webhook } = require("svix");

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
const getUsersById = async (req, res) => {
  try {
    const user = await userModel.getUsersById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to create a new user
const createUsers = async (req, res) => {
  const CREATE_WEBHOOK_SECRET = process.env.CREATE_WEBHOOK_SECRET;
  if (!CREATE_WEBHOOK_SECRET) {
    throw new Error("You need a CREATE_WEBHOOK_SECRET in your .env");
  }

  // Get the headers and body
  const headers = req.headers;
  const payload = JSON.stringify(req.body);

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: "Error occurred -- no svix headers",
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(CREATE_WEBHOOK_SECRET);

  let evt;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error verifying webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Extract user data from the payload
  const { id, first_name, last_name, username, email_addresses, phone_numbers } = evt.data;
  const email_address = email_addresses[0].email_address;

  // Check if phone_numbers has at least 5 elements
  if (!phone_numbers || phone_numbers.length < 5) {
    return res.status(400).json({
      success: false,
      message: "Insufficient phone numbers provided",
    });
  }

  const phone_number = phone_numbers[4].phone_number;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", evt.data);

  // Create a new user
  try {
    const user = await userModel.createUsers(id, first_name, last_name, username, email_address, phone_number);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.log("Error creating user:", error.message);
    return res.status(500).json({
      success: false,
      message: `Error creating user: ${error.message}`,
    });
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
  const DELETE_WEBHOOK_SECRET = process.env.DELETE_WEBHOOK_SECRET;
  if (!DELETE_WEBHOOK_SECRET) {
    throw new Error("You need a DELETE_WEBHOOK_SECRET in your .env");
  }

  // Get the headers and body
  const headers = req.headers;
  const payload = JSON.stringify(req.body);

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: "Error occurred -- no svix headers",
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.log("Error verifying webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Extract user data from the payload
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", evt.data);

  // Delete a new user
  try {
    const user = await userModel.deleteUsers(id); 
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: user,
    });
  } catch (error) {
    console.log("Error deleting user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};


// Export the functions
module.exports = {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUser,
  deleteUsers,
};
