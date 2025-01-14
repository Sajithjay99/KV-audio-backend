import express  from "express";
import { registerUser } from "../controller/userController.js";
import { loginUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

export default userRouter;