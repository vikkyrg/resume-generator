import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import "./Theme8.css";

const Theme8 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    workData,
    educationData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme8">

      {/* ================= HEADER ================= */}
      <div className="t8-header">
        <h1>{personalData?.name || "AHMDD SAAH"}</h1>
        <h2>{personalData?.profile || "MARKETING MANAGER"}</h2>
      </div>

      {/* ================= BODY ================= */}
      <div className="t8-body">

        {/* ========== LEFT COLUMN ========== */}
        <div className="t8-left">

          <div className="t8-section">
            <h3>CONTACT</h3>
            <p>📞 {personalData?.phone}</p>
            <p>✉ {personalData?.email}</p>
            <p>📍 {personalData?.address}</p>
          </div>

          <div className="t8-section">
            <h3>SKILLS</h3>
            <ul>
              {(personalData?.skill || "")
                .split(",")
                .map((s, i) => (
                  <li key={i}>{s.trim()}</li>
                ))}
            </ul>
          </div>

          <div className="t8-section">
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

        {/* ========== CENTER TIMELINE ========== */}
        <div className="t8-line">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {/* ========== RIGHT COLUMN ========== */}
        <div className="t8-right">

          {/* PROFILE */}
          <div className="t8-block">
            <h3>👤 PROFILE</h3>
            <p>{personalData?.summary}</p>
          </div>

          {/* EDUCATION (MOVED HERE – WAS PROJECTS) */}
          <div className="t8-block mt-3">
            <h3>🎓 EDUCATION</h3>

            {Object.values(educationData?.educationTitles || {}).map(
              (title, index) => (
                <div key={index} className="item8">
                  <strong>{title}</strong>
                  <p>
                    {Object.values(
                      educationData?.educationDesc || {}
                    )[index]}
                  </p>
                </div>
              )
            )}
          </div>

          {/* EXPERIENCE (UNCHANGED) */}
          <div className="t8-block mt-3">
            <h3>💼 WORK EXPERIENCE</h3>

            {Object.values(workData?.workTitles || {}).map(
              (title, index) => (
                <div key={index} className="item8">
                  <strong>{title}</strong>
                  <p>
                    {Object.values(workData?.workDesc || {})[index]}
                  </p>
                </div>
              )
            )}
          </div>

          {/* PROJECTS (MOVED HERE – WAS EDUCATION) */}
          <div className="t8-block">
            <h3>📁 PROJECTS</h3>

            {Object.values(projectData?.projectTitles || {}).map(
              (title, index) => (
                <div key={index} className="item8">
                  <strong>{title}</strong>
                  <p>
                    {Object.values(
                      projectData?.projectDesc || {}
                    )[index]}
                  </p>
                </div>
              )
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Theme8;
