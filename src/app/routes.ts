import type { Request, Response } from "express";
import { Router } from "express";

import createError from "http-errors";
import { successResponse } from "../helper/responseHandler";
import errorHandler from "../middlewares/errorHandler";
import authRouter from "../routes/auth.routes";
import bloodRouter from "../routes/donar.routes";
import historyRouter from "../routes/history.routes";
import patientRouter from "../routes/patient.routes";
import userRouter from "../routes/user.routes";

const router: Router = Router();

// home route
router.get("/", (_req: Request, res: Response) => {
  successResponse(res, {
    statusCode: 200,
    message: "Welcome to the KIN Blood API",
  });
});

// health check route
router.get("/health", (_req: Request, res: Response) => {
  successResponse(res, {
    statusCode: 200,
    message: "Server is running fine.",
  });
});

router.use("/api/v1/donars", bloodRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/history", historyRouter);
router.use("/api/v1/patient", patientRouter);

// 404 route
router.use((req: Request) => {
  throw createError(404, "Could not find this route" + `: ${req.originalUrl}`);
});

// error handler
router.use(errorHandler);

export default router;
