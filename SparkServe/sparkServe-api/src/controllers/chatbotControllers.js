const { getChatHistory, saveChatMessage } = require("../models/chatbotModels");

const OpenAI = require("openai");

// Get the OpenAI api key from env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat handler function to handle chat prompts and response
const chatHandler = async (req, res) => {
  const { userId, prompt, conversationId } = req.body;

  // Check if prompt is empty
  if (!prompt) {
    return res.status(400).send("Prompt is empty - it is required");
  }

  // Check if userId is empty
  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  // Try to connect to OpenAI API
  try {
    let messages = [
      {
        "role": "system",
        "content": "The application is SparkServe, and you are Sparkie, guiding users to volunteer opportunities. Do not add asterisks or hyperlinks, and keep the information brief. Here are some opportunities:\n\n1. **AI Ethics Workshop**\n   - Description: Facilitate discussions on AI ethics for tech professionals.\n   - Date & Time: September 22, 2024, at 1:00 PM\n   - Related Cause: Computers and Technology\n\n2. **Food Drive Coordinator**\n   - Description: Organize and manage food drives for the community.\n   - Date & Time: August 15, 2024, at 9:00 AM\n   - Related Cause: Hunger\n\nFor more details or to explore additional opportunities, please visit our website or contact the organizations directly."
      }
    ];    
    if (conversationId) {
      const previousMessages = await getChatHistory(conversationId);

      previousMessages.forEach((msg) => {
        messages.push({ role: "user", content: msg.prompt });
        messages.push({ role: "assistant", content: msg.response });
      });
    }

    messages.push({ role: "user", content: prompt });

    // Interact with OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // Process the response - specific to OpenAI API response
    const chatResponse = completion.choices[0].message.content.trim();

    // New conversation id and save the chat message to DB
    const newConversationId = conversationId || Date.now().toString();
    await saveChatMessage(userId, newConversationId, prompt, chatResponse);

    res.json({
      prompt: prompt,
      response: chatResponse,
      conversationId: newConversationId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  chatHandler,
};
