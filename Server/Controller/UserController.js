import jwt from "jsonwebtoken";
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import User from "../Model/User.js";

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token;
}

//USER REGISTRATION



//POST:/api/users/register
export const registerUser=async(req,res)=>{

    try{
        const{name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"Missing the required fields"});
        }

        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,email,password:hashedPassword
        });

        const token=generateToken(newUser._id);

        newUser.password=undefined;

        return res.status(201).json({message:"User created successfully",token,user:newUser});

        

    }catch(error){
        return res.status(400).json({message:error.message})

    }

}


//POST: /api/users/login


export const loginUser=async(req,res)=>{

    try{
        const{email,password}=req.body;

        if( !email || !password){
            return res.status(400).json({message:"Missing the required fields"});
        }

        const existingUser=await User.findOne({email})

        if(!existingUser){
            return res.status(400).json({message:"User does not exist"});
        }

        if(!existingUser.comparePassword(password)){
            return res.status(400).json({message:"Invalid email or password"});
        }

        

        const token=generateToken(existingUser._id);

        existingUser.password=undefined;

        return res.status(200).json({message:"Login successful",token,existingUser});

        

    }catch(error){
        return res.status(400).json({message:error.message})

    }

}

//controller to get user by id
//GET : /api/users/data

export const getUserById=async(req,res)=>{

    try{
        const userId=req.userId;

        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found !"});

        }

        user.password=undefined;

       
        return res.status(200).json({user});

        

    }catch(error){
        return res.status(400).json({message:error.message})

    }

}
