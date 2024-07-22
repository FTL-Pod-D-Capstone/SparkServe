const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getChatHistory = async (conversationId) => {
  return await prisma.chat.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
};

const saveChatMessage = async (conversationId, prompt, response) => {
  await prisma.chat.create({
    data: {
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