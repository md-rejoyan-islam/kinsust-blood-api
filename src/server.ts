import dotenv from "dotenv";
import app from "./app/app";
import { connectDB } from "./config/db";
import devConsole from "./helper/devConsole";

// dotenv  config
dotenv.config();

// port
const PORT = process.env.SERVER_PORT || 8080;

// server listen
app.listen(PORT, () => {
  connectDB();
  devConsole(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection error handler
process.on("unhandledRejection", async (error: any) => {
  devConsole(error.name);
});
