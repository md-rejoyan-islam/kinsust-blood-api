import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import corsOptions from "../config/corsOptions";
import router from "./routes";

// express app
const app: Application = express();

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: "Too many requests from this IP, please try again after 5 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message:
        "Too many requests from this IP, please try again after 5 minutes",
    });
  },
});
app.use(limiter);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// cors setup
app.use(cors(corsOptions));

// morgan setup
import morgan from "morgan";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use(router);

export default app;
