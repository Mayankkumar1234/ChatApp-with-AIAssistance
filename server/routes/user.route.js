import { Router } from "express";
import userController from "../controllers/userController";
import authT from "../middlewares/userAuth";
import { body } from "express-validator";
const router = Router();

// Route to create a new user
router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.registerController
);

router.post("/login", body("email").isEmail().withMessage("Email must be a valid email address"),body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"), userController.loginController)

router.get("/profile/:userId",authT ,userController.userProfile);

export default router;
