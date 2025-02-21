// import bcrypt from "bcryptjs";
// import createError from "http-errors";
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const matchPassword = (password, hashPassword) => {
  const isMatch = bcrypt.compareSync(password, hashPassword);

  if (!isMatch) {
    throw createError(400, "Wrong password");
  }
};

// export default matchPassword;
module.exports = matchPassword;
