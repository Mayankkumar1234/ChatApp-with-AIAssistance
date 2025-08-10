import createUser from "../service/user.service.js";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";

const userController = {
  registerController: async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = createUser({ email, password });
      await user.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Internal server error", error: error.message });
    }
  },
  loginController: async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" })
          .select("+password");
      }
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log(user);
      const isValidPasword = await User.isValidPasword(user.password);

      if (!isValidPasword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = User.generateAuthToken();

      return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      console.log(error.message);
      res.json({ error: "Error while login to user", message: error.message });
    }
  },

userProfile :(req, res)=>{
  console.log(req.user);
}
};

export default userController;
