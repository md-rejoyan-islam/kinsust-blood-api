import rateLimit from "express-rate-limit";
import createError from "http-errors";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 minute
  max: 15, // 10 requests per minute
  message: "Too many requests from this IP, please try again after 5 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: () => {
    throw createError(
      429,
      "Too many requests from this IP, please try again after 5 minutes"
    );
  },
});

export default limiter;
