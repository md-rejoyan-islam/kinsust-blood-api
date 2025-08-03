import { NextFunction, Response } from "express";
import createError from "http-errors";

const authorization = (...role: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!role.includes(req?.me?.role)) {
      throw createError(
        403,
        "You don't have permission to perform this action"
      );
    }
    next();
  };
};

export default authorization;
