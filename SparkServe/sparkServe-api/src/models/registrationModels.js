const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRegistration = async (registrationData) => {
  return prisma.registration.create({
    data: {
      userId: registrationData.userId,
      opportunityId: registrationData.opportunityId,
      status: registrationData.status,
    },
  });
};

const getAllRegistrations = async (filter = {}, orderBy = {}) => {
  return prisma.registration.findMany({
    where: filter,
    orderBy: orderBy,
  });
};

const getRegistrationById = async (id) => {
  return prisma.registration.findUnique({
    where: { registrationId: parseInt(id) },
  });
};

const updateRegistration = async (id, registrationData) => {
  return prisma.registration.update({
    where: { registrationId: parseInt(id) },
    data: registrationData,
  });
};

const deleteRegistration = async (id) => {
  return prisma.registration.delete({
    where: { registrationId: parseInt(id) },
  });
};

module.exports = {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};
