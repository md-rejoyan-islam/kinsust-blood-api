import express from "express";
import { me, userLogin, userLogout } from "../controllers/auth.controllers";
import { isLoggedIn, isLoggedOut } from "../middlewares/verify";

const authRouter = express.Router();

// user login
import validate from "../middlewares/validate";
import { loginSchema } from "../validations/auth.validation";

authRouter.route("/login").post(isLoggedOut, validate(loginSchema), userLogin);

// user logout
authRouter.route("/logout").post(isLoggedIn, userLogout);

// logged in user
authRouter.route("/me").get(isLoggedIn, me);

export default authRouter;
