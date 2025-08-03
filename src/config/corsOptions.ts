import { CorsOptions } from "cors";
import dotenv from "dotenv";
import createError from "http-errors";

dotenv.config();

// whitelist
const whitelist: string[] = process.env.WHITE_LIST!.split(",");

// corsOptions
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new createError.Unauthorized("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOptions;
