const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();
const userRoutes = require("./src/routes/userRoutes");
const organizationRoutes = require("./src/routes/organizationRoutes");
const opportunityRoutes = require("./src/routes/opportunityRoutes");
const registrationRoutes = require("./src/routes/registrationRoutes");
const { rateLimiter } = require("../sparkServe-api/utils/security");
const chatbotRoutes = require("../sparkServe-api/src/routes/chatbotRoutes");
const bookmarkRoutes = require('../sparkServe-api/src/routes/bookmarkRoutes');

const app = express();
const port = 3000;

// Enable CORS middleware to handle cross-origin requests
app.use(cors());

// Use morgan for logging requests
app.use(morgan("dev"));

// Middleware to parse JSON request bodies
app.use(express.json());

// Base route
app.get("/", (req, res) => {
    // console.log(req); // This will avoid the unused variable warning

  res.send("Hello from the backend -- You are currently at the / route");
});

// Users routes
app.use("/users", userRoutes);

// // Orgs routes
 app.use("/orgs", organizationRoutes);

 //Opportunity routes
 app.use("/opps", opportunityRoutes);

//Registration routes
app.use("/registration", registrationRoutes);

//use rate limiter for OpenAPI
// app.use(rateLimiter);

app.use("/api/chat", chatbotRoutes);
app.use('/bookmarks', bookmarkRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use("/api/chat", (req, res, next) => {
  console.log("Chat route hit");
  next();
}, chatbotRoutes);
