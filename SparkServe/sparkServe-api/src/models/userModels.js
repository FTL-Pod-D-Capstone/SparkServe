const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get all users
const getAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      feedbacks: true,
      chatBotInteractions: true,
      notifications: true,
      registrations: true,
    },
  });
};

// Function to create a new user
const createUser = async (data) => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (error) {
    console.error("Create User Error: ", error);
    throw new Error("Failed to create user");
  }
};

// Function to find user by username
const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

// Function to find user by email
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Function to find user by phone number
const findUserByPhoneNumber = async (phoneNumber) => {
  return await prisma.user.findUnique({
    where: { phoneNumber },
  });
};

// Function to get user by ID
const findUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { userId: parseInt(userId) },
  });
};

// Function to update user
const updateUser = async (id, userData) => {
  return prisma.user.update({
    where: { userId: parseInt(id) },
    data: userData,
    include: {
      feedbacks: true,
      chatBotInteractions: true,
      notifications: true,
      registrations: true,
    },
  });
};

// Function to delete user
const deleteUsers = async (id) => {
  return prisma.user.delete({ where: { userId: parseInt(id) } });
};

// Export the functions
module.exports = {
  getAllUsers,
  findUserById,
  findUserByUsername,
  findUserByEmail,
  findUserByPhoneNumber,
  createUser,
  updateUser,
  deleteUsers,
};
