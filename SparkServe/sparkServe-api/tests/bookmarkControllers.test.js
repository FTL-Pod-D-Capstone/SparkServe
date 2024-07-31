const request = require('supertest');
const express = require('express');
const bookmarkModel = require('../src/models/bookmarkModels');
const app = express();

jest.mock('../src/models/bookmarkModels');

const bookmarkRoutes = require('../src/routes/bookmarkRoutes');
app.use(express.json());
app.use('/bookmarks', bookmarkRoutes);

describe('Bookmark Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /bookmarks/users/:userId/bookmarks', () => {
    it('should add a bookmark', async () => {
      const mockBookmark = { id: 1, userId: '1', opportunityId: '2' };
      bookmarkModel.addBookmark.mockResolvedValue(mockBookmark);

      const response = await request(app)
        .post('/bookmarks/users/1/bookmarks')
        .send({ opportunityId: '2' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockBookmark);
    });
  });

  describe('DELETE /bookmarks/users/:userId/bookmarks/:opportunityId', () => {
    it('should remove a bookmark', async () => {
      bookmarkModel.removeBookmark.mockResolvedValue({ success: true });

      const response = await request(app)
        .delete('/bookmarks/users/1/bookmarks/2');

      expect(response.status).toBe(204);
    });
  });

  describe('GET /bookmarks/users/:userId/bookmarks', () => {
    it('should get all bookmarks for a user', async () => {
      const mockBookmarks = [
        { id: 1, userId: '1', opportunityId: '2' },
        { id: 2, userId: '1', opportunityId: '3' }
      ];
      bookmarkModel.getBookmarksByUserId.mockResolvedValue(mockBookmarks);

      const response = await request(app)
        .get('/bookmarks/users/1/bookmarks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBookmarks);
    });
  });
});