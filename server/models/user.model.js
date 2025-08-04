import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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


const User = model("User", userSchema);


export default User;
