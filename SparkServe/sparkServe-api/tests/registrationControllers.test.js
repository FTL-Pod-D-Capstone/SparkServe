const request = require('supertest');
const express = require('express');
const registrationModel = require('../src/models/registrationModels');
const app = express();

jest.mock('../src/models/registrationModels');

const registrationRoutes = require('../src/routes/registrationRoutes');
app.use(express.json());
app.use('/registration', registrationRoutes);

describe('Registration Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /registration', () => {
    it('should create a new registration', async () => {
      const mockRegistration = { 
        id: 1, 
        userId: 1, 
        opportunityId: 1, 
        status: 'pending',
        registrationTime: new Date().toISOString()
    };
    registrationModel.createRegistration.mockResolvedValue(mockRegistration);

    const response = await request(app)
      .post('/registration')
      .send({
        userId: 1,
        opportunityId: 1,
        status: 'pending'
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockRegistration);
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/registration')
      .send({
        userId: 1
        // Missing opportunityId
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('GET /registration', () => {
  it('should get all registrations', async () => {
    const mockRegistrations = [
      { id: 1, userId: 1, opportunityId: 1, status: 'pending' },
      { id: 2, userId: 2, opportunityId: 1, status: 'approved' }
    ];
    registrationModel.getAllRegistrations.mockResolvedValue(mockRegistrations);

    const response = await request(app).get('/registration');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRegistrations);
  });

  it('should apply filters if provided', async () => {
    const mockRegistrations = [
      { id: 1, userId: 1, opportunityId: 1, status: 'pending' }
    ];
    registrationModel.getAllRegistrations.mockResolvedValue(mockRegistrations);

    const response = await request(app)
      .get('/registration')
      .query({ status: 'pending' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRegistrations);
    expect(registrationModel.getAllRegistrations).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'pending' }),
      expect.any(Object)
    );
  });
});

describe('GET /registration/:id', () => {
  it('should get a registration by ID', async () => {
    const mockRegistration = { id: 1, userId: 1, opportunityId: 1, status: 'pending' };
    registrationModel.getRegistrationById.mockResolvedValue(mockRegistration);

    const response = await request(app).get('/registration/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRegistration);
  });

  it('should return 404 if registration not found', async () => {
    registrationModel.getRegistrationById.mockResolvedValue(null);

    const response = await request(app).get('/registration/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Registration not found" });
  });
});

describe('PUT /registration/:id', () => {
  it('should update a registration', async () => {
    const mockUpdatedRegistration = { id: 1, userId: 1, opportunityId: 1, status: 'approved' };
    registrationModel.updateRegistration.mockResolvedValue(mockUpdatedRegistration);

    const response = await request(app)
      .put('/registration/1')
      .send({ status: 'approved' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedRegistration);
  });

  it('should return 404 if registration to update is not found', async () => {
    registrationModel.updateRegistration.mockResolvedValue(null);

    const response = await request(app)
      .put('/registration/999')
      .send({ status: 'approved' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('DELETE /registration/:id', () => {
  it('should delete a registration', async () => {
    registrationModel.deleteRegistration.mockResolvedValue({ id: 1 });

    const response = await request(app).delete('/registration/1');

    expect(response.status).toBe(204);
  });

  it('should return 404 if registration to delete is not found', async () => {
    registrationModel.deleteRegistration.mockRejectedValue(new Error('Registration not found'));

    const response = await request(app).delete('/registration/999');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
});