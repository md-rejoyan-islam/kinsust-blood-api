import createError from "http-errors";
import createJWT from "../helper/createJWT";

import { matchPassword } from "../helper/hashPassword";
import User from "../models/user.model";

const userLogin = async (email: string, password: string) => {
  // get user by emaill
  const user = await User.findOne({
    where: { email },
  });

  // user check
  if (!user)
    throw createError(
      404,
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

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
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
