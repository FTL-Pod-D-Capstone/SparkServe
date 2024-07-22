const rateLimit = require("express-rate-limit");

// rate limit to 10 requests from this IP within 15 minutes
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 10,
  message: "Too many requests from this IP, try again after 15 minutes",
});

module.exports = {
  rateLimiter,
};