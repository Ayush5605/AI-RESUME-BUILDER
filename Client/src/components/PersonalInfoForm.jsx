import {
  UserIcon,
  Mail,
  Phone,
  Globe,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

import React from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const fields = [
    {
      key: "fullName",
      label: "Full Name",
      icon: UserIcon,
      placeholder: "Enter your full name",
      required: true,
    },
    {
      key: "email",
      label: "Email",
      icon: Mail,
      placeholder: "Enter your email address",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      placeholder: "Enter your location",
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
      placeholder: "Enter your profession",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      placeholder: "Enter your personal website URL",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>

      <p className="text-sm text-gray-600">
        Get started with personal information
      </p>

      <div className="flex items-center gap-4 mt-4">

        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="User"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80 cursor-pointer"
            />
          ) : (
            <div
              className="inline-flex items-center gap-2 text-slate-600
              hover:text-slate-700 cursor-pointer"
            >
              <UserIcon className="size-10 p-2.5 border rounded-full" />
              Upload user image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) =>
              handleChange("image", e.target.files[0])
            }
          />
        </label>

        {typeof data.image === "object" && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Remove Background
            </p>

            <label
              className="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() =>
                  setRemoveBackground((prev) => !prev)
                }
              />

              <div
                className="w-11 h-6 bg-slate-300 rounded-full
                peer peer-checked:bg-green-600
                transition-colors duration-200"
              ></div>

              <span
                className="absolute left-1 top-1 w-4 h-4 bg-white
                rounded-full transition-transform duration-200
                peer-checked:translate-x-5"
              ></span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key} className="mt-5 space-y-1">

            <label
              className="flex items-center gap-2 text-sm
              font-medium text-gray-700"
            >
              <Icon className="size-4" />

              {field.label}

              {field.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <div className="relative">

              <Icon
                className="absolute left-3 top-3 text-gray-500 size-4"
              />

              <input
                type={field.type || "text"}
                value={data[field.key] || ""}
                placeholder={field.placeholder}
                onChange={(e) =>
                  handleChange(field.key, e.target.value)
                }
                className="mt-1 w-full pl-10 pr-3 py-2 border
                border-gray-300 rounded-lg focus:ring
                focus:ring-blue-500 focus:border-blue-500
                outline-none transition-colors text-sm"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;