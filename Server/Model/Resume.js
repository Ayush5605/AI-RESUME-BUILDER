import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      trim: true,
      default: "Untitled Resume",
    },

    public: {
      type: Boolean,
      default: false,
    },

    template: {
      type: String,
      default: "classic",
    },

    accent_color: {
      type: String,
      default: "#3B82F6",
    },

    professional_summary: {
      type: String,
      trim: true,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    personal_info: {
      image: {
        type: String,
        default: "",
      },

      fullName: {
        type: String,
        trim: true,
        default: "",
      },

      profession: {
        type: String,
        trim: true,
        default: "",
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },

      phone: {
        type: String,
        trim: true,
        default: "",
      },

      location: {
        type: String,
        trim: true,
        default: "",
      },

      linkedIn: {
        type: String,
        trim: true,
        default: "",
      },

      website: {
        type: String,
        trim: true,
        default: "",
      },
    },

    experience: [
      {
        company: {
          type: String,
          trim: true,
          default: "",
        },

        position: {
          type: String,
          trim: true,
          default: "",
        },

        start_date: {
          type: String, // Example: "2025-01"
          default: "",
        },

        end_date: {
          type: String, // Example: "2025-06"
          default: "",
        },

        description: {
          type: String,
          default: "",
        },

        is_current: {
          type: Boolean,
          default: false,
        },
      },
    ],

    projects: [
      {
        name: {
          type: String,
          trim: true,
          default: "",
        },

        type: {
          type: String,
          trim: true,
          default: "",
        },

        description: {
          type: String,
          default: "",
        },
      },
    ],

    education: [
      {
        institution: {
          type: String,
          trim: true,
          default: "",
        },

        degree: {
          type: String,
          trim: true,
          default: "",
        },

        field: {
          type: String,
          trim: true,
          default: "",
        },

        graduation_date: {
          type: String, // Example: "2027-05"
          default: "",
        },

        gpa: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Resume = mongoose.model("Resume", ResumeSchema);

console.log(Resume.schema.obj.personal_info);

export default Resume;