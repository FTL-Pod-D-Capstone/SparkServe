//import model
const { getChatHistory, saveChatMessage } = require("../models/chatbotModels");

const OpenAI = require("openai");

// get the OpenAI api key from env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// chat handler function to handle chat prompts and response
const chatHandler = async (req, res) => {
  const { prompt, conversationId } = req.body;

  //check if prompt is  empty?
  if (!prompt) {
    return res.status(400).send("Prompt is empty - it is required");
  }

  // try to connect to openAI API
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

    // interact with OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // process the response - specific to OpenAI Api resoponse
    const chatResponse = completion.choices[0].message.content.trim();

    //new conversation id and saave the chat message to DB
    const newConversationId = conversationId || Date.now().toString();
    await saveChatMessage(newConversationId, prompt, chatResponse);

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