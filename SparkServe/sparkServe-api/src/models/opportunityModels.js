const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to get all opportunities with filters
const getAllOpportunities = async (filter = {}, orderBy = {}) => {
  return prisma.opportunity.findMany({
    where: filter,
    orderBy: orderBy,
    include: {
      feedbacks: true,
      registrations: true
    },
  });
};

// Function to get opportunity by ID
const getOpportunityById = async (id) => {
  return prisma.opportunity.findUnique({
    where: { opportunityId: parseInt(id) },
    include: {
      feedbacks: true,
      registrations: true
    },
  });
};

// Function to create a new opportunity
const createOpportunity = async (opportunityData) => {
  return prisma.opportunity.create({
    data: {
      title: opportunityData.title,
      description: opportunityData.description,
      organizationId: opportunityData.organizationId,
      address: opportunityData.address,
      dateTime: new Date(opportunityData.dateTime),
      skillsRequired: opportunityData.skillsRequired,
      spotsAvailable: opportunityData.spotsAvailable,
      ageRange: opportunityData.ageRange,
    },
    include: {
      feedbacks: true,
      registrations: true
    },
  });
};

// Function to update an opportunity
const updateOpportunity = async (id, opportunityData) => {
  return prisma.opportunity.update({
    where: { opportunityId: parseInt(id) },
    data: opportunityData,
    include: {
      feedbacks: true,
      registrations: true
    },
  });
};

// Function to delete an opportunity
const deleteOpportunity = async (id) => {
  return prisma.opportunity.delete({
    where: { opportunityId: parseInt(id) },
  });
};

module.exports = {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
};
