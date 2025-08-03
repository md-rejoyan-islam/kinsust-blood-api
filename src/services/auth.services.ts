import createError from "http-errors";
import createJWT from "../helper/createJWT";
import matchPassword from "../helper/matchPassword";
import User from "../models/user.model";

const userLogin = async (email?: string, password?: string) => {
  if (!email) throw createError(400, "Please provide email");
  if (!password) throw createError(400, "Please provide password");

  // get user by emaill
  const user = await User.findOne({
    where: { email },
  });

  // user check
  if (!user)
    throw createError(
      400,
      "Couldn't find any user account!. Please contact us."
    );

  //  password match
  matchPassword(password, user.password);

  // create  access token
  const accessToken = createJWT(
    { email },
    process.env.JWT_LOGIN_SECRET_KEY!,
    +process.env.JWT_LOGIN_EXPIRE!
  );

  return { user, accessToken };
};

const me = async (me: any) => {
  if (!me) {
    throw createError.Unauthorized(
      "Couldn't find any user account!. Please register."
    );
  }
  return me;
};

export { me, userLogin };
