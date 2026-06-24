import express from "express";
import { getUserById, loginUser, registerUser } from "../Controller/UserController.js";
import protect from "../Middlewares/authMiddleware.js";
import { getUserResumes } from "../Controller/ResumeController.js";



const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/data",protect,getUserById);
userRouter.get('/resumes',protect,getUserResumes);



export default userRouter;