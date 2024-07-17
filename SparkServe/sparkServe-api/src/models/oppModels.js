const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get all opportunities with filters
const getAllOpportunities = async (filters = {}, orderBy = {}) => {
  return prisma.opportunity.findMany({
    where: filters,
    orderBy: orderBy,
    include: {
      organization: true,
      feedbacks: true,
      registrations: true,
    },
  });
};

// Function to get opportunity by ID
const getOpportunityById = async (id) => {
  return prisma.opportunity.findUnique({
    where: { opportunityId: parseInt(id) },
    include: {
      organization: true,
      feedbacks: true,
      registrations: true,
    },
  });
};

// Function to create a new opportunity
const createOpportunity = async (opportunityData) => {
  return prisma.opportunity.create({
    data: opportunityData,
    include: {
      organization: true,
      feedbacks: true,
      registrations: true,
    },
  });
};

// Function to update opportunity
const updateOpportunity = async (id, opportunityData) => {
  return prisma.opportunity.update({
    where: { opportunityId: parseInt(id) },
    data: opportunityData,
    include: {
      organization: true,
      feedbacks: true,
      registrations: true,
    },
  });
};

// Function to delete opportunity
const deleteOpportunity = async (id) => {
  return prisma.opportunity.delete({ where: { opportunityId: parseInt(id) } });
};

// Export the functions
module.exports = {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
