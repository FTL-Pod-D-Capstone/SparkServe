const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationControllers");



// Get all organizations
router.get("/", organizationController.getAllOrganizations);

// Get organization by ID
router.get("/:id", organizationController.getOrganizationById);

// Register a new organization
router.post("/register", organizationController.registerOrganization);

// Log in an organization
router.post("/login", organizationController.loginOrganization);

// Update organization
router.put("/:id", organizationController.updateOrganization);

// Delete an organization
router.delete("/:id", organizationController.deleteOrganization);

// Get all opportunities by organization ID
router.get('/:id/opps', organizationController.getOppsByOrgId);

module.exports = router;
