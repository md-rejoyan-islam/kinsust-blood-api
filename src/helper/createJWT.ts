import createError from "http-errors";
import jwt from "jsonwebtoken";

const createJWT = (payload: object, secretKey: string, expiresIn: number) => {
  // payload check
  if (typeof payload !== "object" || !payload) {
    throw createError(404, "Payload must be a non-empty object.");
  }

  // secret key check
  if (typeof secretKey !== "string" || !secretKey) {
    throw createError(404, "Secret key must be a non-empty string");
  }

  // create token and return
  return jwt.sign(payload, secretKey, {
    expiresIn,
  });
};

export default createJWT;
