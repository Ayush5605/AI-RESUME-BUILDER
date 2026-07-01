import { Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
  const formatDate = (date) => {
    if (!date) return "";

    const [year, month] = date.split("-");

    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const SectionTitle = ({ children }) => (
    <div className="mt-8 mb-3">
      <h2
        className="text-[18px] font-bold uppercase tracking-wide"
        style={{ color: accentColor }}
      >
        {children}
      </h2>

      <div
        className="mt-1 h-[2px]"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );

  const contactItems = [
    data.personal_info?.location,
    data.personal_info?.email,
    data.personal_info?.phone,
    data.personal_info?.linkedIn,
    data.personal_info?.gitHub,
    data.personal_info?.website,
  ].filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800 p-10">

      {/* HEADER */}

      <header
        className="text-center pb-5 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-4xl font-bold uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          {data.personal_info?.fullName || "Your Name"}
        </h1>

        <div className="mt-3 flex flex-wrap justify-center text-sm text-gray-700">
          {contactItems.map((item, index) => (
            <span key={index} className="flex items-center">
              {index !== 0 && (
                <span className="mx-2 text-gray-400">|</span>
              )}

              {item.startsWith("http") ? (
                <a
                  href={item}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {item}
                </a>
              ) : (
                item
              )}
            </span>
          ))}
        </div>
      </header>

      {/* SUMMARY */}

      {data.professional_summary && (
        <>
          <SectionTitle>Professional Summary</SectionTitle>

          <p className="text-[15px] leading-7 text-gray-700">
            {data.professional_summary}
          </p>
        </>
      )}

      {/* EXPERIENCE */}

      {data.experience?.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[16px]">
                      {exp.position}
                    </h3>

                    <p className="font-medium text-gray-700">
                      {exp.company}
                    </p>
                  </div>

                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current
                      ? "Present"
                      : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <div className="mt-2 whitespace-pre-line text-[15px] leading-7">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* PROJECTS */}

      {((data.projects && data.projects.length > 0) || (data.project && data.project.length > 0)) && (
        <>
          <SectionTitle>Projects</SectionTitle>

          <div className="space-y-6">
            {(data.projects || data.project).map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[16px]">
                    {project.name}
                  </h3>

                  <div className="flex gap-4 text-sm">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: accentColor }}
                        className="underline"
                      >
                        Live Link
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: accentColor }}
                        className="underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-2 whitespace-pre-line text-[15px] leading-7">
                  {project.description}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* EDUCATION */}

      {data.education?.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>

          <div className="space-y-5">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-[16px]">
                      {edu.institution}
                    </h3>

                    <p>
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </p>

                    {edu.gpa && (
                      <p className="text-gray-600 text-sm">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>

                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(edu.start_date)}
                    {edu.graduation_date &&
                      ` - ${formatDate(edu.graduation_date)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* SKILLS */}

      {data.skills?.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-gray-700">
            {data.skills.map((skill, index) => (
              <span key={index} className="flex items-center">
                {index !== 0 && <span className="mr-4 text-gray-400">•</span>}
                {skill}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfessionalTemplate;