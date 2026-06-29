import jwt from "jsonwebtoken";
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import imageKit from "../Config/Imagekit.js";

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
         console.log("Requested Resume ID:", resumeId);

        const resume=await Resume.findOne({public:true,_id:resumeId});
        console.log("Resume Found:", resume);

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


export const updateResume = async (req, res) => {
  try {

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const userId = req.userId;

    const { resumeId, resumeData, removeBackground } = req.body;
     console.log("resumeId:", resumeId);
    console.log("resumeData:", resumeData);
    console.log("typeof resumeData:", typeof resumeData);


    const image = req.file;

    // Convert JSON string to object
    let resumeDataCopy;

    if(typeof resumeData==='string'){
        resumeDataCopy=await JSON.parse(resumeData);
    }else{
        resumeDataCopy=structuredClone(resumeData);
    }
    console.log("parsed:", resumeDataCopy);

    // Upload image if provided
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.upload({
        file: imageBufferData,
        fileName: "resume.jpg",
        folder: "/user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info.image = response.url;

      // Delete temporary uploaded file
      fs.unlinkSync(image.path);
    }

    // Update resume
    const updatedResume = await Resume.findOneAndUpdate(
      {
        _id: resumeId,
        userId,
      },
      resumeDataCopy,
      {
        new: true,
      }
    );

    if (!updatedResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error.message,
    });
  }
};