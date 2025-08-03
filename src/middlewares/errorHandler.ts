import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";
import { errorResponse } from "../helper/responseHandler";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // validation error
  if (err instanceof ValidationError) {
    err.message = err.errors[0].message;
  }
  errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
};

export default errorHandler;
