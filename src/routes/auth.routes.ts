import express from "express";
import { me, userLogin, userLogout } from "../controllers/auth.controllers";
import validate from "../middlewares/validate";
import { isLoggedIn, isLoggedOut } from "../middlewares/verify";
import { loginSchema } from "../validations/auth.validation";

const authRouter = express.Router();

// user login
authRouter.route("/login").post(isLoggedOut, validate(loginSchema), userLogin);

// user logout
authRouter.route("/logout").post(isLoggedIn, userLogout);

// logged in user
authRouter.route("/me").get(isLoggedIn, me);

export default authRouter;
