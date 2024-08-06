const { getChatHistory: getChatHistoryModel, saveChatMessage } = require("../models/chatbotModels");
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
        role: "system",
        content:
          "You are Sparkie, a friendly assistant for SparkServe, helping users find volunteer opportunities. Provide brief, clear responses using the given data. Avoid technical jargon and keep your answers concise and do not use bold texts, asterisks, or special characters. Format your responses in short sentences for easy readability. DO NOT TOO MUCH LIST OUT VOLUNTEER OPPS. SparkServe is made by Salesforce scholars Ahmed, Morgan, and Larnelle. Always maintain a helpful and encouraging tone!",
      },
      {
        role: "system",
        content:
          "Organization: City Arts Collective - Opportunity: Open Mic Night Host Description: Help organize and host our monthly community open mic night. Address: 654 Arts Ave, City Center, NY Date & Time: 2024-08-25 19:00:00 Cause: Arts and Culture Skills Required: Event planning, Hosting Spots Available: 10 Age Range: 18+ - Opportunity: Mural Painting Project Description: Help create a community mural in the city center. Address: 654 Arts Ave, City Center, NY Date & Time: 2024-09-13 17:00:00 Cause: Arts and Culture Skills Required: Artistic ability, Teamwork Spots Available: 25 Age Range: All ages - Opportunity: Senior Tech Support Description: Provide one-on-one tech support for seniors in our community. Address: 123 Main Street, Downtown City, TX Date & Time: 2024-09-08 15:00:00 Cause: Seniors Skills Required: Tech savvy, Patience Spots Available: 15 Age Range: 16+",
      },
      {
        role: "system",
        content:
          "Organization: Tech Giants - Opportunity: Database Cleanup Description: Assist in organizing and cleaning up our organization's database. Address: 123 Main St San Francisco, CA 94105 Date & Time: 2024-08-12 22:00:00 Cause: Computers and Technology Skills Required: Data entry, Attention to detail Spots Available: 5 Age Range: 18+",
      },
      {
        role: "system",
        content:
          "Organization: Green Earth Foundation - Opportunity: Beach Cleanup Day Description: Join us in cleaning up local beaches and protecting marine life. Address: 91011 Geary Blvd, San Francisco, CA 94109 Date & Time: 2024-08-20 16:00:00 Cause: Environment Skills Required: Physical stamina, Environmental awareness Spots Available: 50 Age Range: All ages - Opportunity: Tree Planting Day Description: Help us plant trees in urban areas to increase green cover. Address: Golden Gate Park, San Francisco, CA Date & Time: 2024-10-10 15:00:00 Cause: Environment Skills Required: Physical fitness, Environmental knowledge Spots Available: 100 Age Range: 12+",
      },
      {
        role: "system",
        content:
          "Organization: Future Tech University - Opportunity: STEM Fair Volunteer Description: Assist in organizing and running our annual STEM fair for high school students. Address: 1213 Mission St, San Francisco, CA 94110 Date & Time: 2024-10-05 17:00:00 Cause: Education & Literacy Skills Required: STEM knowledge, Event coordination Spots Available: 30 Age Range: 18+ - Opportunity: Robotics Workshop for Kids Description: Guide children through basic robotics projects. Address: 123 University Lane, Tech City, CA Date & Time: 2024-11-15 14:00:00 Cause: Children and Youth Skills Required: Robotics knowledge, Teaching skills Spots Available: 15 Age Range: 18+ - Opportunity: Code for Kids Workshop Description: Teach basic coding skills to underprivileged children. Address: 5678 California St, San Francisco, CA 94118 Date & Time: 2024-09-15 14:00:00 Cause: Children and Youth Skills Required: Programming, Teaching Spots Available: 10 Age Range: 18+",
      },
      {
        role: "system",
        content:
          "Organization: Wellness Haven - Opportunity: Food Drive Volunteer Description: Help organize and distribute food at our community food drive. Address: 1234 Market St, San Francisco, CA 94103 Date & Time: 2024-08-20 20:00:00 Cause: Hunger Skills Required: Organizational skills Spots Available: 20 Age Range: 16+ - Opportunity: Nutrition Seminar Assistant Description: Help organize and run a nutrition seminar for community health. Address: 456 Wellness Blvd, Los Angeles, CA Date & Time: 2024-09-08 22:00:00 Cause: Health & Medicine Skills Required: Nutrition knowledge, Event planning Spots Available: 10 Age Range: 18+",
      },
      {
        role: "system",
        content:
          "Organization: Innovate Tech Labs - Opportunity: AI Ethics Workshop Description: Help facilitate discussions on AI ethics for tech professionals. Address: 1617 Lombard St, San Francisco, CA 94123 Date & Time: 2024-09-22 22:00:00 Cause: Computers and Technology Skills Required: AI knowledge, Public speaking Spots Available: 8 Age Range: 21+ - Opportunity: Hackathon Mentor Description: Mentor young developers during our annual 24-hour hackathon. Address: 321 Innovation St, San Jose, CA Date & Time: 2024-08-12 22:00:00 Cause: Computers and Technology Skills Required: Coding expertise, Mentoring Spots Available: 12 Age Range: 21+ - Opportunity: Community Yoga Session Description: Lead or assist in a free yoga session for community members. Address: 1415 Divisadero St, San Francisco, CA 94115 Date & Time: 2024-08-10 18:00:00 Cause: Health & Medicine Skills Required: Yoga experience, Teaching Spots Available: 5 Age Range: 18+",
      },
      {
        role: "system",
        content:
          "Organization: Miami EcoAdventures - Opportunity: Pelican Harbor Coastal Cleanup Description: Volunteers will assist the Pelican Harbor Marina staff beautify this coastal park and keep our ocean ecosystem healthy. Address: 1275 NE 79 ST Causeway Miami, FL 33138 Date & Time: 2024-08-17 15:00:00 Cause: Environment Skills Required: Physical stamina, Environmental awareness Spots Available: 24 Age Range: 16+",
      },
      {
        role: "system",
        content:
          "Organization: The Arc of San Francisco - Opportunity: Friends Like Me Drama/Theater Workshop Description: Designed to relieve the social isolation of adults with developmental disabilities, Friends Like Me offers afternoon and evening recreational activities and games that encourage friendship, conversation, and healthy socialization. Address: 1500 Howard St, San Francisco, CA 94103 Date & Time: 2024-08-13 22:00:00 Cause: Education and Literacy Skills Required: Communication skills Spots Available: 8 Age Range: 16+",
      },
      {
        role: "system",
        content:
          "Organization: Community Living Campaign - Opportunity: Digital Passport: Scanning (In-Person) Description: Use a digital scanner to turn your cherished photos, letters, recipes, (even 3-dimensional objects!) into digital images. Then pair up with your computer coach to learn how to share your images with family and friends. Address: 1663 Mission Street, Suite 525 Date & Time: 2024-09-02 17:00:00 Cause: Senior Skills Required: Teaching skills Spots Available: 14 Age Range: 16+",
      },
      {
        role: "system",
        content:
          "Organization: St. Anthony Foundation - Opportunity: Dining Room Meal Service Description: Our Dining Room needs volunteer support to prepare and serve delicious meals for our guests! Your help is essential to the success of our daily hot meal service. Volunteers will be assigned roles in food preparation, food packing, and ensuring our Dining Room guests are served with dignity. Address: 121 Golden Gate Avenue San Francisco, CA  94102 Date & Time: 2024-08-11 02:30:00 Cause: Hunger Skills Required: Organizational skills Spots Available: 12 Age Range: 18+",
      },
      {
        role: "system",
        content:
          "Organization: America Needs You - Opportunity: Assist in Developing Personal Brand & Online Presence Description: Volunteers will provide valuable insight and expertise from their own personal and professional experiences. Orientation will be provided at the beginning of the day. Address: 82 Nassau St #60358 New York, New York 10038 Date & Time: 2024-09-22 19:00:00 Cause: Education and Literacy Skills Required: Mentoring, Teaching Spots Available: 9 Age Range: 21+",
      },
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
    let chatResponse = completion.choices[0].message.content.trim();

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
const getChatHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await getChatHistoryModel(userId);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  chatHandler,
  getChatHistory,
};
