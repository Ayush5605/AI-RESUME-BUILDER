import React,{useState} from "react";
import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import { toast } from "sonner";

const ExperienceForm = ({ data = [], onChange }) => {

  const {token}=useSelector(state=>state.auth);
  const[generatingIndex,setGeneratingIndex]=useState(-1);


    const generateDescription=async(index)=>{
        
            setGeneratingIndex(index);
            const experience=data[index];
            const prompt=`enhance this job description${experience.description} for the position of ${experience.position} at ${experience.company}`;

            try{
            const data=await api.post("/ai/enhance-job-desc",{userContent:prompt});
            updateExperience(index,"description",data.enhancedContent)

        }catch(e){
            toast.error(e?.response?.data?.message || e.message)

        }finally{
            setGeneratingIndex(-1);
        }
    }
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  const handleCurrentChange = (index, checked) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      is_current: checked,
      end_date: checked ? "" : updated[index].end_date,
    };

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>

          <p className="text-sm text-gray-500">
            Add your job experience
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No work experience added yet!</p>

          <p className="text-sm">
            Click "Add Experience" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-xl space-y-4"
            >
              {/* Title */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  Experience #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Company & Position */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "position",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "start_date",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />

                <input
                  type="month"
                  value={experience.end_date}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "end_date",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    handleCurrentChange(
                      index,
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />

                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                  disabled={generatingIndex === index || !experience.position || !experience.company}
                  onClick={()=>generateDescription(index)}
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                  >
                    {generatingIndex===index ? (<Loader2 className="w-3 h-3 animate-spin"/>):
                    (<Sparkles className="w-3 h-3" />)}
                    {generatingIndex=== index ? "Enhancing" : "Enhance with AI"}
                    
                    
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;