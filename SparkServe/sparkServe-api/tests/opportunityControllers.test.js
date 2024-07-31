const request = require('supertest');
const express = require('express');
const opportunityModel = require('../src/models/opportunityModels');
const app = express();

jest.mock('../src/models/opportunityModels');

const opportunityRoutes = require('../src/routes/opportunityRoutes');
app.use(express.json());
app.use('/opps', opportunityRoutes);

describe('Opportunity Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /opps', () => {
    it('should get all opportunities', async () => {
      const mockOpps = [
        { opportunityId: 1, title: 'Opp 1' },
        { opportunityId: 2, title: 'Opp 2' }
      ];
      opportunityModel.getAllOpportunities.mockResolvedValue(mockOpps);

      const response = await request(app).get('/opps');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOpps);
    });

    it('should apply filters if provided', async () => {
      const mockOpps = [{ opportunityId: 1, title: 'Filtered Opp' }];
      opportunityModel.getAllOpportunities.mockResolvedValue(mockOpps);

      const response = await request(app)
        .get('/opps')
        .query({ ageRange: '18-25', category: 'Technology' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOpps);
      expect(opportunityModel.getAllOpportunities).toHaveBeenCalledWith(
        expect.objectContaining({ ageRange: '18-25', category: 'Technology' }),
        expect.any(Object)
      );
    });
  });

  describe('GET /opps/locations', () => {
    it('should get all opportunity locations', async () => {
      const mockLocations = [
        { id: 1, address: '123 Main St' },
        { id: 2, address: '456 Elm St' }
      ];
      opportunityModel.getAllOpportunitiesLocations.mockResolvedValue(mockLocations);

      const response = await request(app).get('/opps/locations');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockLocations);
    });
  });

  describe('GET /opps/:id', () => {
    it('should get an opportunity by ID', async () => {
      const mockOpp = { opportunityId: 1, title: 'Test Opp' };
      opportunityModel.getOpportunityById.mockResolvedValue(mockOpp);

      const response = await request(app).get('/opps/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOpp);
    });

    it('should return 404 if opportunity not found', async () => {
      opportunityModel.getOpportunityById.mockResolvedValue(null);

      const response = await request(app).get('/opps/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Opportunity not found" });
    });
  });

  describe('POST /opps', () => {
    it('should create a new opportunity', async () => {
      const mockOpp = { opportunityId: 1, title: 'New Opp', organizationId: 1 };
      opportunityModel.createOpportunity.mockResolvedValue(mockOpp);

      const response = await request(app)
        .post('/opps')
        .send({
          title: 'New Opp',
          description: 'Test description',
          organizationId: 1
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockOpp);
    });

    it('should create an opportunity even if some fields are missing', async () => {
      const mockOpp = { opportunityId: 1, title: 'New Opp' };
      opportunityModel.createOpportunity.mockResolvedValue(mockOpp);

      const response = await request(app)
        .post('/opps')
        .send({
          title: 'New Opp'
          // Missing other fields
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockOpp);
    });
  });

  describe('PUT /opps/:id', () => {
    it('should update an opportunity', async () => {
      const mockUpdatedOpp = { opportunityId: 1, title: 'Updated Opp' };
      opportunityModel.updateOpportunity.mockResolvedValue(mockUpdatedOpp);

      const response = await request(app)
        .put('/opps/1')
        .send({ title: 'Updated Opp' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedOpp);
    });

    it('should return 404 if opportunity to update is not found', async () => {
      opportunityModel.updateOpportunity.mockResolvedValue(null);

      const response = await request(app)
        .put('/opps/999')
        .send({ title: 'Updated Opp' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Opportunity not found" });
    });
  });

  describe('DELETE /opps/:id', () => {
    it('should delete an opportunity', async () => {
      opportunityModel.deleteOpportunity.mockResolvedValue({ opportunityId: 1 });

      const response = await request(app).delete('/opps/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('opportunityId', 1);
    });

    it('should return 404 if opportunity to delete is not found', async () => {
      opportunityModel.deleteOpportunity.mockResolvedValue(null);

      const response = await request(app).delete('/opps/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Opportunity not found" });
    });
  });
});