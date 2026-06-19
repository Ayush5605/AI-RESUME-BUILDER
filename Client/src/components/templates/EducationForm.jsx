import React from "react";
import { Briefcase, GraduationCapIcon, Plus, Sparkles, Trash2 } from "lucide-react";


const EducationForm=({data,onChange})=>{


    const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
    field: "",
      graduation_date: "",
      gpa: ""
      
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };
    return(
         <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Education
          </h3>

          <p className="text-sm text-gray-500">
            Add your education
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCapIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No education added yet !</p>

          <p className="text-sm">
            Click "Add Education" to add education
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
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
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Company & Position */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Institute Name"
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Degree"
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "degree",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />


                <input
                  type="text"
                  placeholder="field"
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "field",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />

                <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="CGPA"
                  value={education.gpa}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "cgpa",
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
                  value={education.graduation_date}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "graduation_date",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />

                
              </div>

             
              

            
             
            </div>
          ))}
        </div>
      )}
    </div>
    )
}

export default EducationForm;