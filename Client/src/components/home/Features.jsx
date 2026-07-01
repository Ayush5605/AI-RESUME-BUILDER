import React from "react";
import {
  Sparkles,
  FileText,
  Download,
  Zap,
} from "lucide-react";
import Title from "./Title";

const features = [
  {
    icon: Sparkles,
    title: "AI Resume Generation",
    description:
      "Generate professional resume content with AI assistance, helping you write impactful summaries, skills, and experience sections in seconds.",
    color: "text-violet-600",
    bg: "hover:bg-violet-50 hover:border-violet-300",
  },
  {
    icon: FileText,
    title: "ATS-Friendly Templates",
    description:
      "Choose from modern recruiter-approved templates optimized to pass Applicant Tracking Systems and impress hiring managers.",
    color: "text-green-600",
    bg: "hover:bg-green-50 hover:border-green-300",
  },
  {
    icon: Download,
    title: "Export & Share",
    description:
      "Download your resume as a PDF or instantly share it using a public link whenever you're ready to apply.",
    color: "text-orange-500",
    bg: "hover:bg-orange-50 hover:border-orange-300",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-100 rounded-full w-fit mx-auto px-5 py-2">
        <Zap size={16} />
        <span>AI Resume Builder</span>
      </div>

      <Title
        title="Everything You Need to Build a Winning Resume"
        description="Create ATS-friendly resumes with AI assistance, customizable templates, image support, and one-click PDF export."
      />

      <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
            alt="Resume Builder"
            className="w-full max-w-xl"
          />
        </div>

        {/* Right Cards */}
        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`group border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl cursor-pointer ${feature.bg}`}
              >
                <div className="flex gap-5">
                  <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className={`${feature.color}`} size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-7">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;