import User from "../models/user.model.js";

const createUser = ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const hashPassword = User.hashPassword(password);

  const user = new User({
    email,
    password: hashPassword,
  });
  return user;
};

export default createUser;
