import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import "./Theme1.css";

const Theme1 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    projectData,
    educationData,
    workData,
    awardData
  } = themeData || {};

  return (
    <div className="theme1-container">

      {/* ================= HEADER ================= */}
      <div className="t1-header">

        <h1>{personalData?.name || "Your Name"}</h1>

        <div className="t1-contact">
          <span className="t1-contact-item">
            <FiMapPin className="t1-icon" />
            {personalData?.address || "Address Line"}
          </span>

          <span className="t1-separator">|</span>

          <span className="t1-contact-item">
            <FiMail className="t1-icon" />
            {personalData?.email || "Email Address"}
          </span>

          <span className="t1-separator">|</span>

          <span className="t1-contact-item">
            <FiPhone className="t1-icon" />
            {personalData?.phone || "Phone Number"}
          </span>

        </div>


        <h2>{personalData?.profile || "Work Profile"}</h2>

      </div>

      {/* ================= SUMMARY ================= */}
      <div className="t1-section">
        <h3>SUMMARY</h3>

        <p className="t1-summary">
          {personalData?.summary ||
            "Write a short professional summary about yourself here."}
        </p>
      </div>

      {/* ================= SKILLS ================= */}
      <div className="t1-section">
        <h3>TECHNICAL SKILLS</h3>

        <div className="t1-skills">
          {personalData?.skill
            ?.split(",")
            .map((skill, i) => (
              <span key={i} className="skill-pill">
                {skill.trim()}
              </span>
            ))}
        </div>
      </div>

      {/* ================= PROJECTS ================= */}
      <div className="t1-section">
        <h3>PROJECTS</h3>

        {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
          <div key={i} className="t1-item">
            <b>{projectData.projectTitles[key]}</b>

            <ul>
              {(projectData.projectDesc[`pDescription${i + 1}`] || "")
                .split(",")
                .map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ================= EDUCATION ================= */}
      <div className="t1-section">
        <h3>EDUCATION</h3>

        {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
          <div key={i} className="t1-item">
            <b>{educationData.educationTitles[key]}</b>

            <ul>
              {(educationData.educationDesc[`eDescription${i + 1}`] || "")
                .split(",")
                .map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ================= WORK EXPERIENCE ================= */}
      <div className="t1-section">
        <h3>WORK EXPERIENCE</h3>

        {Object.keys(workData?.workTitles || {}).map((key, i) => (
          <div key={i} className="t1-item">
            <b>{workData.workTitles[key]}</b>

            <ul>
              {(workData.workDesc[`wDescription${i + 1}`] || "")
                .split(",")
                .map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ================= AWARDS ================= */}
      <div className="t1-section">
        <h3>AWARDS & ACHIEVEMENTS</h3>

        <ul>
          {(awardData?.awards || "")
            .split(",")
            .map((a, i) => (
              <li key={i}>{a}</li>
            ))}
        </ul>
      </div>

    </div>
  );
};

export default Theme1;
