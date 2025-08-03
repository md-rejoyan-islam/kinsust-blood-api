import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validate =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
