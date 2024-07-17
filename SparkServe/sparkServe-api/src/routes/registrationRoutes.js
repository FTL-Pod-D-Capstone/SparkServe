const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationControllers');

router.post('/', registrationController.createRegistrationHandler);
router.get('/', registrationController.getAllRegistrationsHandler);
router.get('/:id', registrationController.getRegistrationByIdHandler);
router.put('/:id', registrationController.updateRegistrationHandler);
router.delete('/:id', registrationController.deleteRegistrationHandler);

module.exports = router;
