import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getSingleUserById,
  passwordChange,
  updateUserById,
} from "../controllers/user.controllers";
import { isLoggedIn } from "../middlewares/verify";
import authorization from "../middlewares/authorization";

const userRouter = express.Router();

userRouter.use(isLoggedIn);

import validate from "../middlewares/validate";
import {
  createUserSchema,
  updateUserSchema,
  passwordChangeSchema,
} from "../validations/user.validation";

// get all users and create a new user data
userRouter
  .route("/")
  .get(getAllUsers)
  .post(
    authorization("admin", "superadmin"),
    validate(createUserSchema),
    createUser
  );

// password change
userRouter
  .route("/password-change/:id")
  .put(
    authorization("superadmin", "admin", "moderator"),
    validate(passwordChangeSchema),
    passwordChange
  );

// get,update and delete a user data
userRouter
  .route("/:id")
  .get(authorization("admin", "superadmin", "moderator"), getSingleUserById)
  .put(
    authorization("admin", "superadmin", "moderator"),
    validate(updateUserSchema),
    updateUserById
  )
  .delete(authorization("admin", "superadmin"), deleteUserById);

export default userRouter;
