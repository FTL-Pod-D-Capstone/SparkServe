const organizationModel = require("../models/organizationModels");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Function to register a new organization
const registerOrganization = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, description, address, website, contactEmail, orgUrl, pictureUrl } = req.body;

    // Check if an organization with the same email or phone number already exists
    const existingOrganizationByEmail = await organizationModel.findOrganizationByEmail(email);
    if (existingOrganizationByEmail) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const existingOrganizationByPhoneNumber = await organizationModel.findOrganizationByPhoneNumber(phoneNumber);
    if (existingOrganizationByPhoneNumber) {
      return res.status(400).json({ error: "Phone number is already in use" });
    }

    const newOrganization = await organizationModel.createOrganization({
      name,
      email,
      password,
      phoneNumber,
      description,
      address,
      website,
      contactEmail,
      pictureUrl,
      orgUrl,
    });
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to log in an organization
const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;
    const organization = await organizationModel.validateOrganizationCredentials(email, password);
    if (!organization) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: organization.organizationId, email: organization.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
};
// Function to get all organizations
const getAllOrganizations = async (req, res) => {
  const { name } = req.query;
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
      res.status(200).json({ message: "Organization deleted" });
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
  updateOrganization,
  deleteOrganization,
  getOppsByOrgId,
  registerOrganization,
  loginOrganization,
};
