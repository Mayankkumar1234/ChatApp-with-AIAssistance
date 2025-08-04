import createUser from "../service/user.service.js";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";

const userController = async (req, res) => {
  try {
    const errors = validationResult(req);
    // console.log(req.body);
    console.log(errors);
    // console.log(req.body);
    res.send("Everything fine...");
  } catch (error) {
    console.log(error.message);
  }
};

export default userController;
