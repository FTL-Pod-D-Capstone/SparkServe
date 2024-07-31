const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../src/models/userModels');
const app = express();

// Mock the userModel functions to isolate the controller tests
jest.mock('../src/models/userModels');

// Mock bcrypt and jwt modules to avoid actual encryption and token generation
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const userRoutes = require('../src/routes/userRoutes');
app.use(express.json());
app.use('/users', userRoutes);

describe('User Controllers', () => {
  // Clear all mock implementations after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      // Mock user data to be returned after successful registration
      const mockUser = {
        userId: 1,
        username: 'testuser',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'hashedpassword',
        firstName: 'Test',
        lastName: 'User'
      };

      // Mock user model functions to simulate a new user registration
      userModel.findUserByUsername.mockResolvedValue(null);
      userModel.findUserByEmail.mockResolvedValue(null);
      userModel.findUserByPhoneNumber.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedpassword');
      userModel.createUser.mockResolvedValue(mockUser);

      // Simulate a POST request to register a new user
      const response = await request(app)
        .post('/users/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          phoneNumber: '1234567890',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        });

      // Assert that the response is as expected
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 400 if user already exists', async () => {
      // Mock findUserByUsername to simulate an existing user
      userModel.findUserByUsername.mockResolvedValue({ username: 'existinguser' });

      // Attempt to register with an existing username
      const response = await request(app)
        .post('/users/register')
        .send({
          username: 'existinguser',
          email: 'test@example.com',
          phoneNumber: '1234567890',
          password: 'password123'
        });

      // Assert that the response indicates a conflict
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Username, email, or phone number already exists' });
    });
  });

  describe('POST /users/login', () => {
    it('should log in a user and return a token', async () => {
      // Mock user data for a successful login
      const mockUser = {
        userId: 1,
        username: 'testuser',
        password: 'hashedpassword'
      };

      // Mock necessary functions for a successful login
      userModel.findUserByUsername.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mocktoken');

      // Simulate a login request
      const response = await request(app)
        .post('/users/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      // Assert successful login response
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'mocktoken', userId: 1 });
    });

    it('should return 401 for invalid credentials', async () => {
      // Mock findUserByUsername to simulate a non-existent user
      userModel.findUserByUsername.mockResolvedValue(null);

      // Attempt to login with invalid credentials
      const response = await request(app)
        .post('/users/login')
        .send({
          username: 'nonexistentuser',
          password: 'password123'
        });

      // Assert unauthorized response
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Credentials' });
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      // Mock user data to be returned
      const mockUser = {
        userId: 1,
        username: 'testuser',
        email: 'test@example.com'
      };

      // Mock findUserById to return the mock user
      userModel.findUserById.mockResolvedValue(mockUser);

      // Simulate a GET request to fetch a user
      const response = await request(app).get('/users/1');

      // Assert successful user retrieval
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 404 if user is not found', async () => {
      // Mock findUserById to simulate a non-existent user
      userModel.findUserById.mockResolvedValue(null);

      // Attempt to fetch a non-existent user
      const response = await request(app).get('/users/999');

      // Assert not found response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user', async () => {
      // Mock updated user data
      const mockUpdatedUser = {
        userId: 1,
        username: 'updateduser',
        email: 'updated@example.com'
      };

      // Mock updateUser to return the updated user data
      userModel.updateUser.mockResolvedValue(mockUpdatedUser);

      // Simulate a PUT request to update a user
      const response = await request(app)
        .put('/users/1')
        .send({
          username: 'updateduser',
          email: 'updated@example.com'
        });

      // Assert successful user update
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedUser);
    });

    it('should return 404 if user to update is not found', async () => {
      // Mock updateUser to simulate a non-existent user
      userModel.updateUser.mockResolvedValue(null);

      // Attempt to update a non-existent user
      const response = await request(app)
        .put('/users/999')
        .send({
          username: 'updateduser'
        });

      // Assert not found response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      // Mock deleted user data
      const mockDeletedUser = {
        userId: 1,
        username: 'deleteduser'
      };

      // Mock deleteUsers to return the deleted user data
      userModel.deleteUsers.mockResolvedValue(mockDeletedUser);

      // Simulate a DELETE request
      const response = await request(app).delete('/users/1');

      // Assert successful user deletion
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'User deleted successfully',
        user: mockDeletedUser
      });
    });

    it('should return 404 if user to delete is not found', async () => {
      // Mock deleteUsers to simulate a non-existent user
      userModel.deleteUsers.mockResolvedValue(null);

      // Attempt to delete a non-existent user
      const response = await request(app).delete('/users/999');

      // Assert not found response
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });
});