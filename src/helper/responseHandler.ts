import { Response } from "express";

interface IErrorResponse {
  statusCode?: number;
  message?: string;
}

interface ISuccessResponse {
  statusCode?: number;
  message?: string;
  payload?: object;
}

const errorResponse = (
  res: Response,
  { statusCode = 500, message = "Unknown Server Error" }: IErrorResponse
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
    },
  });
};

const successResponse = (
  res: Response,
  { statusCode = 200, message = "Success", payload }: ISuccessResponse
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...payload,
  });
};

export { errorResponse, successResponse };
