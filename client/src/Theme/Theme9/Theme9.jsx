import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import "./Theme9.css";

const Theme9 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    workData,
    educationData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme9">

      {/* ================= HEADER ================= */}
      <div className="t9-header">

        <h1>{personalData?.name || "HOWARD JONES"}</h1>

        <h2>{personalData?.profile || "Lawyer"}</h2>

        <p className="t9-address">
          {personalData?.address || "15 Yardley Road, San Francisco, CA 94131, United States"}
        </p>

        <div className="t9-contact">
          <span>{personalData?.phone || "(415) 646-1277"}</span>
          <span>{personalData?.email || "h.jones@gmail.com"}</span>
        </div>

      </div>

      <hr className="t9-line" />

      {/* ================= PROFILE ================= */}
      <div className="t9-section">

        <h3>PROFILE</h3>

        <p>
          {personalData?.summary ||
            "Experienced and innovative professional with passion and dedication to excellence."}
        </p>

      </div>

      <hr className="t9-line" />

      {/* ================= EMPLOYMENT HISTORY ================= */}
      <div className="t9-section">

        <h3>EMPLOYMENT HISTORY</h3>

        {Object.values(workData?.workTitles || {}).map((title, index) => (
          <div key={index} className="t9-item">

            <div className="t9-item-row">
              <strong>{title}</strong>
            </div>

            <ul>
              {(Object.values(workData?.workDesc || {})[index] || "")
                .split(",")
                .map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
            </ul>

          </div>
        ))}

      </div>

      <hr className="t9-line" />

      {/* ================= EDUCATION ================= */}
      <div className="t9-section">

        <h3>EDUCATION</h3>

        {Object.values(educationData?.educationTitles || {}).map((title, index) => (
          <div key={index} className="t9-item">

            <div className="t9-item-row">
              <strong>{title}</strong>
            </div>

            <p className="t9-sub">
              {Object.values(educationData?.educationDesc || {})[index]}
            </p>

          </div>
        ))}

      </div>

      <hr className="t9-line" />

      {/* ================= SKILLS ================= */}
      <div className="t9-section">

        <h3>SKILLS</h3>

        <div className="t9-skills">

          {(personalData?.skill || "")
            .split(",")
            .map((skill, index) => (
              <div key={index} className="t9-skill-row">
                <span>{skill.trim()}</span>
              </div>
            ))}

        </div>

      </div>

      <hr className="t9-line" />

      {/* ================= PROJECTS ================= */}
      <div className="t9-section">

        <h3>PROJECTS</h3>

        {Object.values(projectData?.projectTitles || {}).map((title, index) => (
          <div key={index} className="t9-item">

            <strong>{title}</strong>

            <p className="t9-sub">
              {Object.values(projectData?.projectDesc || {})[index]}
            </p>

          </div>
        ))}

      </div>

      <hr className="t9-line" />

      {/* ================= AWARDS ================= */}
      <div className="t9-section">

        <h3>AWARDS & ACHIEVEMENTS</h3>

        <ul>
          {(awardData?.awards || "")
            .split(",")
            .map((award, i) => (
              <li key={i}>{award}</li>
            ))}
        </ul>

      </div>

      <hr className="t9-line" />

    </div>
  );
};

export default Theme9;
