import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, Loader } from "lucide-react";
import ResumePreview from "../components/ResumePreview";

const Preview = () => {

    const {resumeId}=useParams();

    const[isLoading,setIsLoading]=useState(true);

    const [resumeData,setResumeData]=useState(null);

    const loadResume=async()=>{
        setResumeData(dummyResumeData.find(resume=>resume._id===
            resumeId || null));
            setIsLoading(false);
    }

    useEffect(()=>{
        loadResume()
    },[])
    return resumeData ? (
        <div className="bg-slate-100">
            <div className="max-w-3xl mx-auto py-10">
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} classes="py-4 bg-white"/>

            </div>
            
           
        </div>
    ): (

        <div>
            {isLoading ? 
                <Loader/>
            :(
                <div className="flex flex-col items-center justify-center
                h-screen">
                    <p className="text-center text-6xl text-slate-400">Resume Not Found</p>
                    <a href="/" className="mt-6 bg-green-500 hover:bg-green-600
                    text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1
                    ring-green-400 flex items-center transition-colors">
                        <ArrowLeftIcon className="size-4 mr-2"/>
                        Go to Home Page 
                    </a>
                    </div>

            )}
        </div>
        
    )
} 

export default Preview;