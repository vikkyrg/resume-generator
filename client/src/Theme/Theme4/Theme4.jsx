import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import "./Theme4.css";

const Theme4 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    workData,
    educationData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme4">

      {/* ================= LEFT COLUMN ================= */}
      <div className="theme4-left">

        <h1>{personalData?.name || "Jamie Jobseeker"}</h1>

        <div className="contact-item">
          📧 {personalData?.email || "email@example.com"}
        </div>

        <div className="contact-item">
          📞 {personalData?.phone || "0000000000"}
        </div>

        <div className="contact-item">
          📍 {personalData?.address || "Anywhere, NY"}
        </div>

        {/* WORK PROFILE */}
        <h2>Work Profile</h2>
        <p>{personalData?.profile || "Software Developer"}</p>

        {/* SKILLS */}
        <h2>Skills</h2>

        <ul>
          {(personalData?.skill || "")
            .split(",")
            .map((skill, i) => (
              <li key={i}>{skill.trim()}</li>
            ))}
        </ul>

        {/* EDUCATION */}
        <h2>Education</h2>

        {Object.values(educationData?.educationTitles || {}).map(
          (title, index) => (
            <div key={index} className="edu-block">

              <strong>{title}</strong>

              <p>
                {Object.values(
                  educationData?.educationDesc || {}
                )[index] || ""}
              </p>

            </div>
          )
        )}

      </div>

      {/* ================= RIGHT COLUMN ================= */}
      <div className="theme4-right">

        {/* SUMMARY */}
        <h3>Summary</h3>

        <p>
          {personalData?.summary ||
            "Write your professional summary here"}
        </p>

        {/* EXPERIENCE */}
        <h3>Experience</h3>

        {Object.values(workData?.workTitles || {}).map(
          (title, index) => (
            <div key={index} className="right-block">

              <strong>{title}</strong>

              <p>
                {Object.values(
                  workData?.workDesc || {}
                )[index] || ""}
              </p>

            </div>
          )
        )}

        {/* PROJECTS */}
        <h3>Projects</h3>

        {Object.values(projectData?.projectTitles || {}).map(
          (title, index) => (
            <div key={index} className="right-block">

              <strong>{title}</strong>

              <p>
                {Object.values(
                  projectData?.projectDesc || {}
                )[index] || ""}
              </p>

            </div>
          )
        )}

        {/* AWARDS */}
        <h3>Awards & Achievements</h3>

        <ul>
          {(awardData?.awards || "")
            .split(",")
            .map((award, i) => (
              <li key={i}>{award}</li>
            ))}
        </ul>

      </div>

    </div>
  );
};

export default Theme4;
