const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/orgControllers");

// get all organizations
router.get("/", organizationController.getAllOrganizations);
// get organization by ID
router.get("/:id", organizationController.getOrganizationById);
// add a new organization
router.post("/", organizationController.createOrganization);
// update organization
router.put("/:id", organizationController.updateOrganization);
// delete an organization
router.delete("/:id", organizationController.deleteOrganization);
// Get all opportunities by organization ID
router.get('/:id/opps', organizationController.getOppsByOrgId);

module.exports = router;
