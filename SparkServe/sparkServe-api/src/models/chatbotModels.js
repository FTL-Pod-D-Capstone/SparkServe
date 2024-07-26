const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getChatHistory = async (userId) => {
  return await prisma.chatBotInteraction.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { timestamp: "desc" },
    take: 20, 
    select: {
      prompt: true,
      response: true,
      timestamp: true
    }// Limit to last 10 interactions
  });
};

const saveChatMessage = async (userId, conversationId, prompt, response) => {
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { userId: parseInt(userId) },
    });
  
    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
  
    await prisma.chatBotInteraction.create({
      data: {
        userId: parseInt(userId),
        conversationId,
        prompt,
        response,
      },
    });
  };
  

module.exports = {
  getChatHistory,
  saveChatMessage,
};
