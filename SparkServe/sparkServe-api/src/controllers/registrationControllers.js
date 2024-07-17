const registrationModel = require('../models/registrationModels');

const createRegistrationHandler = async (req, res) => {
  try {
    const registration = await registrationModel.createRegistration(req.body);
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllRegistrationsHandler = async (req, res) => {
  try {
    const registrations = await registrationModel.getAllRegistrations();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRegistrationByIdHandler = async (req, res) => {
  try {
    const registration = await registrationModel.getRegistrationById(req.params.id);
    if (registration) {
      res.status(200).json(registration);
    } else {
      res.status(404).json({ error: "Registration not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRegistrationHandler = async (req, res) => {
  try {
    const registration = await registrationModel.updateRegistration(req.params.id, req.body);
    res.status(200).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRegistrationHandler = async (req, res) => {
  try {
    await registrationModel.deleteRegistration(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRegistrationHandler,
  getAllRegistrationsHandler,
  getRegistrationByIdHandler,
  updateRegistrationHandler,
  deleteRegistrationHandler,
};
