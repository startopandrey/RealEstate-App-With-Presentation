export const isValidEmail = (value: string): boolean => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return emailRegex.test(value);
};
export const isValidStringLength = (
  value: string,
  minLength: number = 0,
  maxLength: number = 9999
) => {
  return value.length <= maxLength && value.length >= minLength;
};

export const isValidRegister = (email, password, username) => {
  return (
    isValidEmail(email) &&
    isValidStringLength(password, 4, 24) &&
    isValidStringLength(username, 2, 24)
  );
};

export const isValidLogin = (email, password) => {
  return isValidEmail(email) && isValidStringLength(password, 4, 24);
};
