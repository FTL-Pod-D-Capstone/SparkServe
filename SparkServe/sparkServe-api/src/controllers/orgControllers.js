const organizationModel = require("../models/orgModels");

// Function to get all organizations 
const getAllOrganizations = async (req, res) => {
    const { name } = req.query;
    //sorting by name asc/desc
    let orderBy = {};
  
    if (name) {
      orderBy.name = name === "asc" ? "asc" : "desc";
    }
  
    try {
      const organizations = await organizationModel.getAllOrganizations(orderBy);
      res.status(200).json(organizations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Function to get organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const organization = await organizationModel.getOrganizationById(req.params.id);
    if (organization) {
      res.status(200).json(organization);
    } else {
      res.status(404).json({ error: "Organization not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to create a new organization
const createOrganization = async (req, res) => {
  try {
    const newOrganization = await organizationModel.createOrganization(req.body);
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to update organization
const updateOrganization = async (req, res) => {
  try {
    const updatedOrganization = await organizationModel.updateOrganization(req.params.id, req.body);
    if (updatedOrganization) {
      res.status(200).json(updatedOrganization);
    } else {
      res.status(404).json({ error: "Organization not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to delete organization
const deleteOrganization = async (req, res) => {
  try {
    const deletedOrganization = await organizationModel.deleteOrganization(req.params.id);
    if (deletedOrganization) {
      res.status(200).json(deletedOrganization);
    } else {
      res.status(404).json({ error: "Organization not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Function to get all opportunities by organization ID
const getOppsByOrgId = async (req, res) => {
  const { id: organizationId } = req.params;

  try {
    const opportunities = await organizationModel.getOppsByOrgId(organizationId);
    if (opportunities.length > 0) {
      res.status(200).json(opportunities);
    } else {
      res.status(404).json({ error: "No opportunities found for this organization" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
