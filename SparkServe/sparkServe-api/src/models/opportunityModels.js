const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to get all opportunities with filters
const getAllOpportunities = async (filter = {}, orderBy = {}) => {
  return prisma.opportunity.findMany({
    where: filter,
    orderBy: orderBy,
    include: {
      feedbacks: true,
      registrations: true,
      organization: {
        select: {
          name: true,
        }
      }
    },
  });
};

// Function to get opportunity by ID
const getOpportunityById = async (id) => {
  return prisma.opportunity.findUnique({
    where: { opportunityId: parseInt(id) },
    include: {
      feedbacks: true,
      registrations: true,
      organization: {
        select: {
          name: true,
        }
      }
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
      relatedCause: opportunityData.relatedCause,
      skillsRequired: opportunityData.skillsRequired,
      spotsAvailable: opportunityData.spotsAvailable,
      ageRange: opportunityData.ageRange,
      pictureUrl: opportunityData.pictureUrl,
      opportunityUrl: opportunityData.opportunityUrl,
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

// Function to get all opportunity locations
const getAllOpportunitiesLocations = async () => {
  try {
    const opportunities = await getAllOpportunities();
    const locationsData = opportunities.map(opp => ({
      id: opp.opportunityId,
      title: opp.title,
      address: opp.address,
      description: opp.description,
      dateTime: opp.dateTime,
      relatedCause: opp.relatedCause,
      skillsRequired: opp.skillsRequired,
      spotsAvailable: opp.spotsAvailable,
      ageRange: opp.ageRange,
      pictureUrl: opp.pictureUrl,
      opportunityUrl: opp.opportunityUrl,
      organizationName: opp.organization?.name
    }));
    return locationsData;
  } catch (error) {
    console.error('Error in getAllOpportunitiesLocations model:', error);
    throw new Error(`Error fetching opportunity locations: ${error.message}`);
  }
};

// Function to delete an opportunity
const deleteOpportunity = async (id) => {
  return prisma.opportunity.delete({
    where: { opportunityId: parseInt(id) },
  });
};

module.exports = {
  getAllOpportunities,
  getAllOpportunitiesLocations,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
};
