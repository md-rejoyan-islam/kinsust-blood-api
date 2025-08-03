import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getSingleUserById,
  passwordChange,
  updateUserById,
} from "../controllers/user.controllers";
import authorization from "../middlewares/authorization";
import validate from "../middlewares/validate";
import { isLoggedIn } from "../middlewares/verify";
import {
  createUserSchema,
  passwordChangeSchema,
  updateUserSchema,
} from "../validations/user.validation";

const userRouter = express.Router();

userRouter.use(isLoggedIn);

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
