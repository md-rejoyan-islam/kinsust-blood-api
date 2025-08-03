// check bd phone number
const checkBDPhoneNumber = (phone: string) => {
  const bdPhoneRegex = /^(\+88)?01[0-9]{9}$/;
  return bdPhoneRegex.test(phone);
};

// check email
const isEmail = (email: string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export { checkBDPhoneNumber, isEmail };
