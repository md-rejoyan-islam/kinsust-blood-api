// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import createError from "http-errors";
// import morgan from "morgan";
// import corsOptions from "./config/corsOptions.js";
// import devConsole from "./helper/devConsole.js";
// import { successResponse } from "./helper/responseHandler.js";
// import errorHandler from "./middlewares/errorHandler.js";
// import bloodRouter from "./routes/donar.routes.js";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/user.routes.js";
// import authRouter from "./routes/auth.routes.js";
// import historyRouter from "./routes/history.routes.js";

const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const corsOptions = require("./config/corsOptions");
const devConsole = require("./src/helper/devConsole");
const { successResponse } = require("./src/helper/responseHandler");
const errorHandler = require("./src/middlewares/errorHandler");
const { connectDB } = require("./config/db");
const bloodRouter = require("./src/routes/donar.routes");
const userRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");
const historyRouter = require("./src/routes/history.routes");
const patientRouter = require("./src/routes/patient.routes");

// dotenv  config
dotenv.config();

// port
const PORT = process.env.SERVER_PORT || 8000;

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// cors setup
app.use(cors(corsOptions));

// morgan setup
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// static files
// app.use("/public", express.static("./public"));

// routes
app.use("/api/v1/donars", bloodRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/patient", patientRouter);

// home route
app.get("/", (req, res) => {
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Welcome to the KIN Blood API",
  });
});

// invalid route handler
app.use((req, res, next) => {
  next(createError(404, "Couldn't find this route."));
});

// error handler
app.use(errorHandler); // error handler

// server listen
app.listen(PORT, () => {
  connectDB();
  devConsole(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection error handler
process.on("unhandledRejection", async (error, promise) => {
  devConsole(error.name);
});
