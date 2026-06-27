import jwt from "jsonwebtoken";
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import imageKit from "../Config/Imagekit.js";
import ImageKit from "@imagekit/nodejs";
import fs from "fs";

import Resume from "../Model/Resume.js";



//controller for getting user resumes
//get :/api/users/resumes

export const getUserResumes=async(req,res)=>{
    try{

        const userId=req.userId;

        const resumes=await Resume.find({userId});
        return res.status(200).json({resumes})

    }catch(error){
        return res.status(400).json({message:error.message})


    }
}


// post : /api/resumes/create

export const  createResume=async(req,res)=>{

    const userId=req.userId;

    const{title}=req.body;

    const newResume=await Resume.create({userId,title});

    return res.status(201).json({message:"Resume created successfully",resume:newResume})

    try{

    }catch(error){
        res.status(400).json({message:error.message});
    }

}

//delete: /api/resumes/delete
export const deleteResume=async(req,res)=>{

    try{
        const userId=req.userId;
        const{resumeId}=req.params;

        await Resume.findOneAndDelete({userId,_id:resumeId})

        return res.status(200).json({message:"Resume deleted successfully"})

    }catch(error){
                res.status(400).json({message:error.message});


    }
    
}

//get:/api/resumes/get

export const getResumeById=async(req,res)=>{

    try{
        const userId=req.userId;
        const{resumeId}=req.params;

        const resume=await Resume.findOne({userId,_id:resumeId})

        if(!resume){
            return res.status(404).json({message:"Resume Not Found!"})
        }

        resume.__v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;

        return res.status(200).json({resume});

    }catch(error){
                res.status(400).json({message:error.message});


    }
    
}



//get :/api/resumes/public


export const getPublicResumeById=async(req,res)=>{

    try{
        
        const{resumeId}=req.params;

        const resume=await Resume.findOne({public:true,_id:resumeId})

        if(!resume){
            return res.status(404).json({message:"Resume Not Found!"})
        }

        resume.__v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;

        return res.status(200).json({resume});

    }catch(error){
                res.status(400).json({message:error.message});


    }
    
    
}


    //put :/api/resumes/update
    export const updateResume=async(req,res)=>{

    try{
        const userId=req.userId;
        const{resumeId,resumeData,removeBackground}=req.body;

        const image=req.file;

        


        let resumeDataCopy=JSON.parse(resumeData);

        if(image){

            const mageBufferData=fs.createReadStream(image.path)

            const response = await imageKit.files.upload({
           file: imageBufferData,
           fileName: 'resume.jpg',
           folder:'user-resumes',
           transformation:{
            pre:'w-300,h-300,fo-face,z-0.75'+(removeBackground ? ',e-bgremove': '')
           }
           });

           resumeDataCopy.personal_info.image=response.url;
        }

        const updatedResume=await resume.findByIdAndUpdate({userId,_id:resumeId},resumeDataCopy,{new:true})

        

        return res.status(200).json({message:"updated successfully",updateResume});

    }catch(error){
                res.status(400).json({message:error.message});


    }
    
    
}




