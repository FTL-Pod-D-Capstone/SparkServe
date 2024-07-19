const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get all organizations with optional sorting
const getAllOrganizations = async (orderBy = {}) => {
  return prisma.organization.findMany({
    orderBy: orderBy,
    include: {
      opportunities: true 
    }
  });
};

// Function to get organization by ID
const getOrganizationById = async (id) => {
  return prisma.organization.findUnique({
    where: { organizationId: parseInt(id) },
    include: {
      opportunities: true 
    }
  });
};

// Function to create a new organization
const createOrganization = async (organizationData) => {
  return prisma.organization.create({
    data: organizationData,
  });
};

// Function to update organization
const updateOrganization = async (id, organizationData) => {
  return prisma.organization.update({
    where: { organizationId: parseInt(id) },
    data: organizationData,
  });
};

// Function to delete organization
const deleteOrganization = async (id) => {
  return prisma.organization.delete({
    where: { organizationId: parseInt(id) },
  });
};

// Function to get all opportunities by organization ID
const getOppsByOrgId = async (organizationId) => {
  return prisma.opportunity.findMany({
    where: { organizationId: parseInt(organizationId) },
    include: {
      feedbacks: true,
      registrations: true,
    },
  });
};


// Export the functions
module.exports = {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getOppsByOrgId
};
