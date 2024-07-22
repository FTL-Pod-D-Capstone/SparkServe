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
    const newOpportunity = await opportunityModel.createOpportunity(req.body);
    res.status(201).json(newOpportunity);
  } catch (error) {
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
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
