const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const organizationModel = require('../src/models/organizationModels');
const app = express();

jest.mock('../src/models/organizationModels');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const organizationRoutes = require('../src/routes/organizationRoutes');
app.use(express.json());
app.use('/orgs', organizationRoutes);

describe('Organization Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orgs/register', () => {
    it('should register a new organization', async () => {
      const mockOrg = {
        organizationId: 1,
        name: 'Test Org',
        email: 'test@org.com',
        phoneNumber: '1234567890',
      };
      organizationModel.findOrganizationByEmail.mockResolvedValue(null);
      organizationModel.findOrganizationByPhoneNumber.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedpassword');
      organizationModel.createOrganization.mockResolvedValue(mockOrg);

      const response = await request(app)
        .post('/orgs/register')
        .send({
          name: 'Test Org',
          email: 'test@org.com',
          password: 'password123',
          phoneNumber: '1234567890'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockOrg);
    });

    it('should return 400 if organization with email already exists', async () => {
      organizationModel.findOrganizationByEmail.mockResolvedValue({ email: 'test@org.com' });

      const response = await request(app)
        .post('/orgs/register')
        .send({
          name: 'Test Org',
          email: 'test@org.com',
          password: 'password123',
          phoneNumber: '1234567890'
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Email is already in use" });
    });
  });

  describe('POST /orgs/login', () => {
    it('should log in an organization', async () => {
      const mockOrg = {
        organizationId: 1,
        email: 'test@org.com',
        password: 'hashedpassword'
      };
      organizationModel.validateOrganizationCredentials.mockResolvedValue(mockOrg);
      jwt.sign.mockReturnValue('mocktoken');

      const response = await request(app)
        .post('/orgs/login')
        .send({
          email: 'test@org.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token', 'mocktoken');
      expect(response.body).toHaveProperty('organizationId', 1);
      expect(response.body).toHaveProperty('message', 'Login successful');
    });

    it('should return 401 for invalid credentials', async () => {
      organizationModel.validateOrganizationCredentials.mockResolvedValue(null);

      const response = await request(app)
        .post('/orgs/login')
        .send({
          email: 'test@org.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: "Invalid credentials" });
    });
  });

  describe('GET /orgs', () => {
    it('should get all organizations', async () => {
      const mockOrgs = [
        { organizationId: 1, name: 'Org 1' },
        { organizationId: 2, name: 'Org 2' }
      ];
      organizationModel.getAllOrganizations.mockResolvedValue(mockOrgs);

      const response = await request(app).get('/orgs');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrgs);
    });
  });

  describe('GET /orgs/:id', () => {
    it('should get an organization by ID', async () => {
      const mockOrg = { organizationId: 1, name: 'Test Org' };
      organizationModel.getOrganizationById.mockResolvedValue(mockOrg);

      const response = await request(app).get('/orgs/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrg);
    });

    it('should return 404 if organization not found', async () => {
      organizationModel.getOrganizationById.mockResolvedValue(null);

      const response = await request(app).get('/orgs/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Organization not found" });
    });
  });

  describe('PUT /orgs/:id', () => {
    it('should update an organization', async () => {
      const mockUpdatedOrg = { organizationId: 1, name: 'Updated Org' };
      organizationModel.updateOrganization.mockResolvedValue(mockUpdatedOrg);

      const response = await request(app)
        .put('/orgs/1')
        .send({ name: 'Updated Org' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedOrg);
    });

    it('should return 404 if organization to update is not found', async () => {
      organizationModel.updateOrganization.mockResolvedValue(null);

      const response = await request(app)
        .put('/orgs/999')
        .send({ name: 'Updated Org' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Organization not found" });
    });
  });

  describe('DELETE /orgs/:id', () => {
    it('should delete an organization', async () => {
      organizationModel.deleteOrganization.mockResolvedValue({ organizationId: 1 });

      const response = await request(app).delete('/orgs/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Organization deleted" });
    });

    it('should return 404 if organization to delete is not found', async () => {
      organizationModel.deleteOrganization.mockResolvedValue(null);

      const response = await request(app).delete('/orgs/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Organization not found" });
    });
  });

  describe('GET /orgs/:id/opps', () => {
    it('should get all opportunities for an organization', async () => {
      const mockOpps = [
        { opportunityId: 1, title: 'Opp 1' },
        { opportunityId: 2, title: 'Opp 2' }
      ];
      organizationModel.getOppsByOrgId.mockResolvedValue(mockOpps);

      const response = await request(app).get('/orgs/1/opps');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOpps);
    });

    it('should return 404 if no opportunities found for the organization', async () => {
      organizationModel.getOppsByOrgId.mockResolvedValue([]);

      const response = await request(app).get('/orgs/1/opps');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "No opportunities found for this organization" });
    });
  });
});