import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme11.css";

const Theme11 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    projectData,
    educationData,
    workData,
    awardData,
  } = themeData || {};

  return (
    <div className="theme11-page">
      {/* ================= HEADER ================= */}
      <div className="theme11-header">
        <h1>{personalData?.name || "John Doe"}</h1>
        <h2>{personalData?.profile || "Engineer"}</h2>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="theme11-content">
        {/* LEFT COLUMN */}
        <div className="theme11-left">
          {/* CONTACT */}
          <h3>Contact</h3>

          <div className="theme11-contact">
            <div className="theme11-contact-item">
              <FiPhone className="theme11-icon" />
              <span className="theme11-text">
                {personalData?.phone || "9090909090"}
              </span>
            </div>

            <div className="theme11-contact-item">
              <FiMail className="theme11-icon" />
              <span className="theme11-text">
                {personalData?.email || "email@gmail.com"}
              </span>
            </div>

            <div className="theme11-contact-item">
              <FiMapPin className="theme11-icon" />
              <span className="theme11-text">
                {personalData?.address || "India"}
              </span>
            </div>
          </div>

          {/* EDUCATION */}
          <h3>Education</h3>
          {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
            <div key={i} className="theme11-block">
              <b>{educationData.educationTitles[key]}</b>
              <ul>
                {(educationData.educationDesc[`eDescription${i + 1}`] || "")
                  .split(",")
                  .map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
              </ul>
            </div>
          ))}

          {/* SKILLS */}
          <h3>Skills</h3>
          <ul>
            {(personalData?.skill || "")
              .split(",")
              .map((s, i) => (
                <li key={i}>{s}</li>
              ))}
          </ul>
        </div>

        {/* RIGHT COLUMN */}
        <div className="theme11-right">
          <h3>Summary</h3>
          <p className="theme11-summary">
            {personalData?.summary || "Write a professional summary here"}
          </p>

          <h3>Work Experience</h3>
          {Object.keys(workData?.workTitles || {}).map((key, i) => (
            <div key={i} className="theme11-block">
              <b>{workData.workTitles[key]}</b>
              <ul>
                {(workData.workDesc[`wDescription${i + 1}`] || "")
                  .split(",")
                  .map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
              </ul>
            </div>
          ))}

          <h3>Projects</h3>
          {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
            <div key={i} className="theme11-block">
              <b>{projectData.projectTitles[key]}</b>
              <ul>
                {(projectData.projectDesc[`pDescription${i + 1}`] || "")
                  .split(",")
                  .map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
              </ul>
            </div>
          ))}

          <h3>Awards & Achievements</h3>
          <ul>
            {(awardData?.awards || "")
              .split(",")
              .map((a, i) => (
                <li key={i}>{a}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Theme11;
