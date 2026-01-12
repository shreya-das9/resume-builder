import React, { useEffect, useRef, useState } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import { formatYearMonth } from "../../utils/helper";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#FFFFFF", "#000000", "#F5F5F5", "#333333", "#666666"];

const SectionTitle = ({ text, color }) => {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b"
      style={{ borderColor: color, color: color }}
    >
      {text}
    </h2>
  );
};

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-6 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header Section */}
      <div className="mb-6 pb-6 border-b-2" style={{ borderColor: themeColors[2] }}>
        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          <div
            className="w-[120px] h-[120px] min-w-[120px] flex items-center justify-center rounded"
            style={{ backgroundColor: themeColors[2] }}
          >
            {resumeData.profileInfo.profilePreviewUrl ? (
              <img
                src={resumeData.profileInfo.profilePreviewUrl}
                className="w-[120px] h-[120px] object-cover"
              />
            ) : (
              <div className="w-[120px] h-[120px] flex items-center justify-center text-5xl">
                <LuUser style={{ color: themeColors[3] }} />
              </div>
            )}
          </div>

          {/* Header Info */}
          <div className="flex-1">
            <h1
              className="text-3xl font-bold mb-1"
              style={{ color: themeColors[1] }}
            >
              {resumeData.profileInfo.fullName}
            </h1>
            <p
              className="text-lg font-semibold mb-4"
              style={{ color: themeColors[3] }}
            >
              {resumeData.profileInfo.designation}
            </p>

            {/* Contact Info in Header */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
              <div className="flex items-center gap-2">
                <LuGithub style={{ color: themeColors[3] }} />
                <span style={{ color: themeColors[4] }}>
                  {resumeData.contactInfo.github || "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RiLinkedinLine style={{ color: themeColors[3] }} />
                <span style={{ color: themeColors[4] }}>
                  {resumeData.contactInfo.linkedin || "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuMail style={{ color: themeColors[3] }} />
                <span style={{ color: themeColors[4] }}>
                  {resumeData.contactInfo.email || "-"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuPhone style={{ color: themeColors[3] }} />
                <span style={{ color: themeColors[4] }}>
                  {resumeData.contactInfo.phone || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-5">
        {/* Professional Summary */}
        {resumeData.profileInfo.summary && (
          <div>
            <SectionTitle text="Professional Summary" color={themeColors[1]} />
            <p className="text-xs leading-relaxed" style={{ color: themeColors[4] }}>
              {resumeData.profileInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.workExperience && resumeData.workExperience.length > 0 && (
          <div>
            <SectionTitle text="Experience" color={themeColors[1]} />
            <div className="space-y-3">
              {resumeData.workExperience.map((data, index) => (
                <div key={`work_${index}`} className="text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold" style={{ color: themeColors[1] }}>
                        {data.role}
                      </p>
                      <p style={{ color: themeColors[3] }}>{data.company}</p>
                    </div>
                    <p
                      className="text-right whitespace-nowrap ml-2"
                      style={{ color: themeColors[4] }}
                    >
                      {formatYearMonth(data.startDate)} - {formatYearMonth(data.endDate)}
                    </p>
                  </div>
                  <p className="mt-1" style={{ color: themeColors[4] }}>
                    {data.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div>
            <SectionTitle text="Projects" color={themeColors[1]} />
            <div className="space-y-3">
              {resumeData.projects.map((project, index) => (
                <div key={`project_${index}`} className="text-xs">
                  <p className="font-bold" style={{ color: themeColors[1] }}>
                    {project.title}
                  </p>
                  <p style={{ color: themeColors[4] }} className="mt-1">
                    {project.description}
                  </p>
                  {(project.github || project.liveDemo) && (
                    <div className="flex gap-4 mt-1 flex-wrap">
                      {project.github && (
                        <a
                          href={project.github}
                          className="text-blue-600 underline"
                        >
                          Link
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          className="text-blue-600 underline"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <SectionTitle text="Education" color={themeColors[1]} />
            <div className="space-y-2">
              {resumeData.education.map((data, index) => (
                <div key={`education_${index}`} className="text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold" style={{ color: themeColors[1] }}>
                        {data.degree}
                      </p>
                      <p style={{ color: themeColors[3] }}>
                        {data.institution}
                      </p>
                    </div>
                    <p
                      className="text-right whitespace-nowrap ml-2"
                      style={{ color: themeColors[4] }}
                    >
                      {formatYearMonth(data.startDate)} - {formatYearMonth(data.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div>
            <SectionTitle text="Technical Skills" color={themeColors[1]} />
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {resumeData.skills.map((skill, index) => (
                <div key={`skill_${index}`} className="text-xs">
                  <p className="font-semibold" style={{ color: themeColors[1] }}>
                    {skill.title}:
                  </p>
                  <p style={{ color: themeColors[4] }}>
                    {skill.skills?.join(", ") || ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div>
            <SectionTitle text="Achievements" color={themeColors[1]} />
            <ul className="text-xs space-y-1">
              {resumeData.certifications.map((cert, index) => (
                <li key={`cert_${index}`} style={{ color: themeColors[4] }}>
                  <span className="font-semibold">{cert.title}</span>
                  {cert.issuer && ` - ${cert.issuer}`}
                  {cert.year && ` (${cert.year})`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests */}
        {resumeData.interests && resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
          <div>
            <SectionTitle text="Interests" color={themeColors[1]} />
            <div className="flex flex-wrap gap-2">
              {resumeData.interests.map((interest, index) => {
                if (!interest) return null;
                return (
                  <span
                    key={`interest_${index}`}
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: themeColors[2], color: themeColors[3] }}
                  >
                    {interest}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateFour;
