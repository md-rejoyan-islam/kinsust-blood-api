// import { errorResponse } from "../helper/responseHandler.js";
const { errorResponse } = require("../helper/responseHandler");

const authorization = (...role) => {
  return async (req, res, next) => {
    if (!role.includes(req?.me?.role)) {
      return errorResponse(res, {
        statusCode: 403,
        message: "You don't have permission to perform this action",
      });
    }

    // make sure the user is authorized

    // const id = req?.params?.id;
    // if (id) {
    //   if (
    //     req?.me?.role === "admin" ||
    //     req?.me.role === "superadmin" ||
    //     req?.me?.id === id
    //   ) {
    //     return next();
    //   }
    //   return errorResponse(res, {
    //     statusCode: 403,
    //     message: "You don't have permission to perform this action",
    //   });
    // }

    next();
  };
};

// export default authorization;
module.exports = authorization;
