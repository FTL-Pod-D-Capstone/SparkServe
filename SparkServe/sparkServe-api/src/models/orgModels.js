const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

// Function to create a new organization with hashed password
const createOrganization = async (organizationData) => {
  const hashedPassword = await bcrypt.hash(organizationData.password, 10);
  return prisma.organization.create({
    data: { ...organizationData, password: hashedPassword },
  });
};

// Function to find organization by email
const findOrganizationByEmail = async (email) => {
  return prisma.organization.findUnique({
    where: { email },
  });
};

// Function to find organization by phone number
const findOrganizationByPhoneNumber = async (phoneNumber) => {
  return prisma.organization.findUnique({
    where: { phoneNumber },
  });
};

// Function to validate organization credentials
const validateOrganizationCredentials = async (email, password) => {
  const organization = await findOrganizationByEmail(email);
  if (!organization) return null;
  const isValid = await bcrypt.compare(password, organization.password);
  return isValid ? organization : null;
};

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
  getOppsByOrgId,
  createOrganization,
  findOrganizationByEmail,
  validateOrganizationCredentials,
  findOrganizationByPhoneNumber
};
