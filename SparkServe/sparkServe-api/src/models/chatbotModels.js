const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getChatHistory = async (conversationId) => {
  return await prisma.chatBotInteraction.findMany({
    where: { conversationId },
    orderBy: { timestamp: "asc" },
  });
};

const saveChatMessage = async (userId, conversationId, prompt, response) => {
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { userId },
    });
  
    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
  
    await prisma.chatBotInteraction.create({
      data: {
        userId,
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
