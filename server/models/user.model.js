import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
     minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must be at most 50 characters long"],
  },
  pasword: {
    type: String,
    required: true,
  },
});

userSchema.static.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.isValid = (password) => {
  return bcrypt.compare(password, this.pasword);
};
userSchema.methods.generateAuthToken = () => {
  const token = bcrypt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const User = model("user", userSchema);

export default User;
