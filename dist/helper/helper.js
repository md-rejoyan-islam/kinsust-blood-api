"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.checkBDPhoneNumber = void 0;
// check bd phone number
const checkBDPhoneNumber = (phone) => {
    const bdPhoneRegex = /^(\+88)?01[0-9]{9}$/;
    return bdPhoneRegex.test(phone);
};
exports.checkBDPhoneNumber = checkBDPhoneNumber;
// check email
const isEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};
exports.isEmail = isEmail;
