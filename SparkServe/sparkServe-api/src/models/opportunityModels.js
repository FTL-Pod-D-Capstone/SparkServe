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

const getOpportunitiesByDateRange = async (startDate, endDate) => {
  return prisma.opportunity.findMany({
    where: {
      dateTime: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
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

const createOpportunity = async (opportunityData) => {
  const requiredFields = ['title', 'description', 'organizationId'];
  const optionalFields = ['address', 'dateTime', 'relatedCause', 'skillsRequired', 'spotsAvailable', 'pictureUrl', 'opportunityUrl', 'ageRange'];
  // console.log(opportunityData)
  // Check if all required fields are present
  for (const field of requiredFields) {
    if (!(field in opportunityData)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Prepare the data object
  const data = {
    title: opportunityData.title,
    description: opportunityData.description,
    organizationId: parseInt(opportunityData.organizationId),
  };

  // Add optional fields if they are present
  for (const field of optionalFields) {
    if (field in opportunityData && opportunityData[field] !== null && opportunityData[field] !== undefined) {
      if (field === 'dateTime') {
        data[field] = new Date(opportunityData[field]);
      } else if (field === 'spotsAvailable') {
        data[field] = parseInt(opportunityData[field]);
      } else {
        data[field] = opportunityData[field];
      }
    }
  }
  // console.log(data)
  return prisma.opportunity.create({
    data,
    include: {
      feedbacks: true,
      registrations: true,
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
  getOpportunitiesByDateRange,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
};
