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

// Function to get user by ID
const getUsersById = async (id) => {
  return prisma.user.findUnique({
    where: { userId: parseInt(id) },
    include: {
      feedbacks: true,
      chatBotInteractions: true,
      notifications: true,
      registrations: true,
    },
  });
};

// Function to create a new user
const createUsers = async (id, first_name, last_name, username) => {
  return prisma.user.created({
    data: {
      clerkUserId: id,
      firstName: first_name,
      lastName: last_name,
      userName: username,
    },
    include: {
      feedbacks: true,
      chatBotInteractions: true,
      notifications: true,
      registrations: true,
    },
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
  getUsersById,
  createUsers,
  updateUser,
  deleteUsers,
};
