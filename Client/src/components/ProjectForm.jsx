import React from "react";
import { FolderKanban, Plus, Sparkles, Trash2 } from "lucide-react";

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className="text-sm text-gray-500">
            Add your projects
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Empty State */}

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderKanban className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No projects added yet!</p>

          <p className="text-sm">
            Click "Add Project" to add projects
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-xl space-y-4"
            >
              {/* Title */}

              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  Project #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Project Name and Type */}

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                  type="text"
                  placeholder="Project Type (e.g. Full Stack, AI/ML)"
                  value={project.type}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Description */}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    Project Description
                  </label>

                  
                </div>

                <textarea
                  rows={4}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your project, features, technologies used and achievements..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;