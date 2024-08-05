const opportunityModel = require("../models/opportunityModels");

// Function to get all opportunities with filters
const getAllOpportunities = async (req, res) => {
  const { ageRange, category, name, sort } = req.query;

  let filters = {};
  let orderBy = {};

  if (ageRange) {
    filters.ageRange = ageRange; // Assuming ageRange string like "[18, 25]"
  }
  if (category) {
    filters.category = category;
  }
  if (name) {
    filters.title = { contains: name };
  }
  if (sort) {
    orderBy.title = sort === "asc" ? "asc" : "desc";
  }

  try {
    const opportunities = await opportunityModel.getAllOpportunities(filters, orderBy);
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get opportunity by ID
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await opportunityModel.getOpportunityById(req.params.id);
    if (opportunity) {
      res.status(200).json(opportunity);
    } else {
      res.status(404).json({ error: "Opportunity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to create a new opportunity
const createOpportunity = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      organizationId, 
      address, 
      dateTime, 
      relatedCause, //optional
      skillsRequired, //optional in progress
      spotsAvailable, //optional in progress
      ageRange, //optional in progress
      pictureUrl, //optional in progress
      opportunityUrl //optional in progress
    } = req.body;

    const newOpportunity = await opportunityModel.createOpportunity({
      title,
      description,
      organizationId: parseInt(organizationId),
      address,
      dateTime: new Date(dateTime),
      relatedCause,
      skillsRequired,
      spotsAvailable: parseInt(spotsAvailable),
      ageRange,
      pictureUrl,
      opportunityUrl
    });

    res.status(201).json(newOpportunity);
  } catch (error) {
    console.error('Error creating opportunity:', error);
    res.status(400).json({ error: error.message });
  }
};

// Function to update opportunity
const updateOpportunity = async (req, res) => {
  try {
    const updatedOpportunity = await opportunityModel.updateOpportunity(req.params.id, req.body);
    if (updatedOpportunity) {
      res.status(200).json(updatedOpportunity);
    } else {
      res.status(404).json({ error: "Opportunity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOpportunitiesByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const opportunities = await opportunityModel.getOpportunitiesByDateRange(new Date(startDate), new Date(endDate));
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get all opportunity locations
const getAllOpportunitiesLocations = async (req, res) => {
  try {
    // console.log('Fetching all opportunities locations');
    // console.log('Request details:', req.method, req.url, req.headers);
    const locations = await opportunityModel.getAllOpportunitiesLocations();
    // console.log('Locations fetched:', locations);
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error in getAllOpportunitiesLocations controller:', error);
    res.status(400).json({ error: error.message });
  }
};



// Function to delete opportunity
const deleteOpportunity = async (req, res) => {
  try {
    const deletedOpportunity = await opportunityModel.deleteOpportunity(req.params.id);
    if (deletedOpportunity) {
      res.status(200).json(deletedOpportunity);
    } else {
      res.status(404).json({ error: "Opportunity not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export the functions
module.exports = {
  getAllOpportunities,
  getAllOpportunitiesLocations,
  getOpportunityById,
  getOpportunitiesByDateRange,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
