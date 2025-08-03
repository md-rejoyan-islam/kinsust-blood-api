import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import corsOptions from "../config/corsOptions";
import limiter from "../config/rateLimiter";
import router from "./routes";

// express app
const app: Application = express();

// Apply rate limiting to all requests
app.use(limiter);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// cors setup
app.use(cors(corsOptions));

// morgan setup
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use(router);

export default app;
