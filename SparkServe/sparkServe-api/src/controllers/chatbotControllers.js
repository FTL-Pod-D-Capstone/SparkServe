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
      { role: "system", content: "You are a helpful assistant." },
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
