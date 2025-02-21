// check bd phone number
const checkBDPhoneNumber = (phone) => {
  const bdPhoneRegex = /^(\+88)?01[0-9]{9}$/;
  return bdPhoneRegex.test(phone);
};

// check email
const isEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

module.exports = {
  checkBDPhoneNumber,
  isEmail,
};
