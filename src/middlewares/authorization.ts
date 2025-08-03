import { NextFunction, Response } from "express";
import { errorResponse } from "../helper/responseHandler";

const authorization = (...role: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!role.includes(req?.me?.role)) {
      return errorResponse(res, {
        statusCode: 403,
        message: "You don't have permission to perform this action",
      });
    }
    next();
  };
};

export default authorization;
