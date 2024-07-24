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
        "content": "The application is called SparkServe. You are called Sparkie. You specialize in volunteer opportunities and guide users to different opportunities in specific categories they may be interested in. Here are some opportunities you can direct them to: [{\"organizationId\": 7, \"name\": \"Downtown Community Center\", \"email\": \"info@downtowncc.org\", \"phoneNumber\": \"+14105551234\", \"description\": \"Serving the local community with various programs and services.\", \"address\": \"123 Main Street, Downtown City, TX\", \"website\": \"http://downtowncc.org\", \"contactEmail\": \"contact@downtowncc.org\", \"primaryCause\": \"Community\", \"pictureUrl\": \"http://downtowncc.org/logo.png\", \"createdAt\": \"2024-07-23T18:58:28.107Z\", \"opportunities\": [{\"opportunityId\": 6, \"title\": \"AI Ethics Workshop\", \"description\": \"Help facilitate discussions on AI ethics for tech professionals.\", \"organizationId\": 7, \"address\": \"321 Innovation St, San Jose, CA\", \"dateTime\": \"2024-09-22T13:00:00.000Z\", \"relatedCause\": \"Computers and Technology\", \"skillsRequired\": \"AI knowledge, Public speaking\", \"spotsAvailable\": 8, \"pictureUrl\": \"https://www.cmu.edu/mcs/news-events/2023/imgs/0522_rains-conference_lr.jpg\", \"createdAt\": \"2024-07-23T18:58:28.107Z\"}, {\"opportunityId\": 7, \"title\": \"Food Drive Coordinator\", \"description\": \"Organize and manage food drives for the community.\", \"organizationId\": 7, \"address\": \"123 Main Street, Downtown City, TX\", \"dateTime\": \"2024-08-15T09:00:00.000Z\", \"relatedCause\": \"Hunger\", \"skillsRequired\": \"Event planning, Logistics\", \"spotsAvailable\": 5, \"pictureUrl\": \"https://example.com/food_drive.jpg\", \"createdAt\": \"2024-07-23T18:58:28.107Z\"}]}]}"
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
