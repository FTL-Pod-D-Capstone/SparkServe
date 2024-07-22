const express = require("express");
const router = express.Router();
const opportunityController = require("../controllers/opportunityControllers");

// get all opportunities with filters
router.get("/", opportunityController.getAllOpportunities);
// get opportunity by ID
router.get("/:id", opportunityController.getOpportunityById);
// add a new opportunity
router.post("/", opportunityController.createOpportunity);
// update opportunity
router.put("/:id", opportunityController.updateOpportunity);
// delete an opportunity
router.delete("/:id", opportunityController.deleteOpportunity);

module.exports = router;
