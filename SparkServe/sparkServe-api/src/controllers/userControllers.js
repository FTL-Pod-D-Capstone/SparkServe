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
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("You need a WEBHOOK_SECRET in your .env");
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
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
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

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id,first_name,last_name,username  } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", evt.data);

    const user = await userModel.createUsers(id,first_name,last_name,username ) //andi cooked-- Pass the extracted data to the model function

    return res.status(200).json({
      success: true,
      message: "Webhook received",
      user: user
    });
  }

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
      res.status(200).json(deletedUser);
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
  getUsersById,
  createUsers,
  updateUser,
  deleteUsers,
};
