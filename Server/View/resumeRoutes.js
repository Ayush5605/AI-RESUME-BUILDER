import express from "express";
import protect from "../Middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../Controller/ResumeController.js";
import upload from "../Config/Multer.js";


const resumeRouter=express.Router();

resumeRouter.post("/create",protect,createResume);
resumeRouter.delete("/delete/:resumeId",protect,deleteResume);
resumeRouter.get("/get/:resumeId",protect,getResumeById);
resumeRouter.get("/public/:resumeId",getPublicResumeById);
resumeRouter.put('/update',upload.single('image'),protect,updateResume);



export default resumeRouter;
