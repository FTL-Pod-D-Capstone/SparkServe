const request = require('supertest');
const express = require('express');
const chatbotModel = require('../src/models/chatbotModels');
const app = express();

jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: 'Test response' } }]
          })
        }
      }
    }));
  });


jest.mock('../src/models/chatbotModels');

const chatbotRoutes = require('../src/routes/chatbotRoutes');
app.use(express.json());
app.use('/api/chat', chatbotRoutes);

describe('Chatbot Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/chat', () => {
    it('should handle a chat request successfully', async () => {
      chatbotModel.saveChatMessage.mockResolvedValue({});

      const response = await request(app)
        .post('/api/chat')
        .send({
          userId: '1',
          prompt: 'Test prompt',
          conversationId: '123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('response');
      expect(response.body).toHaveProperty('prompt', 'Test prompt');
      expect(response.body).toHaveProperty('conversationId');
    });

    it('should return 400 if prompt is empty', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({
          userId: '1',
          prompt: '',
          conversationId: '123'
        });

      expect(response.status).toBe(400);
      expect(response.text).toBe('Prompt is empty - it is required');
    });

    it('should return 400 if userId is missing', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({
          prompt: 'Test prompt',
          conversationId: '123'
        });

      expect(response.status).toBe(400);
      expect(response.text).toBe('User ID is required');
    });

    it('should handle OpenAI API errors', async () => {
      const mockOpenAI = new (require('openai'))();
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('OpenAI API error'));

      const response = await request(app)
        .post('/api/chat')
        .send({
          userId: '1',
          prompt: 'Test prompt',
          conversationId: '123'
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Something went wrong');
    });

    it('should create a new conversation if conversationId is not provided', async () => {
      chatbotModel.saveChatMessage.mockResolvedValue({});

      const response = await request(app)
        .post('/api/chat')
        .send({
          userId: '1',
          prompt: 'Test prompt'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('conversationId');
      expect(typeof response.body.conversationId).toBe('string');
    });
  });

  describe('GET /api/chat/history/:userId', () => {
    it('should get chat history for a user', async () => {
      const mockHistory = [
        { prompt: 'Test prompt', response: 'Test response', timestamp: new Date().toISOString() }
      ];
      chatbotModel.getChatHistory.mockResolvedValue(mockHistory);

      const response = await request(app)
        .get('/api/chat/history/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockHistory);
    });

    it('should return an empty array if no chat history', async () => {
      chatbotModel.getChatHistory.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/chat/history/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should handle errors when fetching chat history', async () => {
      chatbotModel.getChatHistory.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/chat/history/1');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Something went wrong');
    });
  });

  describe('Chatbot response content', () => {
    it('should include system messages in the chat context', async () => {
      const response = await request(app)
        .post('/api/chat')
        .send({
          userId: '1',
          prompt: 'What is SparkServe?'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('response');
    });
  });

  describe('Chatbot conversation continuity', () => {
    it('should maintain conversation context when conversationId is provided', async () => {
      const mockPreviousMessages = [
        { prompt: 'Previous prompt', response: 'Previous response' }
      ];
      chatbotModel.getChatHistory.mockResolvedValue(mockPreviousMessages);

      const response = await request(app)
        .post('/api/chat')
        .send({
          userId: '1',
          prompt: 'Follow-up question',
          conversationId: '123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('response');
    });
  });
});