const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const Routes = require("");
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
    console.log(req); // This will avoid the unused variable warning

  res.send("Hello from the backend -- You are currently at the / route");
});

//  routes
// app.use("/", Routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
