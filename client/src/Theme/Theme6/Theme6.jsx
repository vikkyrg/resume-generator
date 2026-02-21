import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import "./Theme6.css";

const Theme6 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    workData,
    educationData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme6">

      {/* ================= HEADER ================= */}
      <div className="theme6-header">

        <div className="header-left">
          <h1>{personalData?.name || "NAME NAME"}</h1>
          <h2>{personalData?.profile || "SOFTWARE ENGINEER"}</h2>
        </div>

        <div className="header-right">
          <img
            src={
              personalData?.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="profile"
          />
        </div>

      </div>

      {/* ================= BODY ================= */}
      <div className="theme6-body">

        {/* ---------- LEFT COLUMN ---------- */}
        <div className="theme6-left">

          <h3>CONTACT</h3>

          <p>📞 {personalData?.phone || "Phone"}</p>
          <p>✉ {personalData?.email || "Email"}</p>
          <p>📍 {personalData?.address || "Address"}</p>

          <h3>TECHNICAL SKILLS</h3>

          <ul>
            {(personalData?.skill || "")
              .split(",")
              .map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
          </ul>

        </div>

        {/* ---------- RIGHT COLUMN ---------- */}
        <div className="theme6-right">

          {/* SUMMARY */}
          <h3>SUMMARY</h3>
          <p>
            {personalData?.summary ||
              "Write your professional summary here"}
          </p>

          {/* WORK EXPERIENCE */}
          <h3>WORK EXPERIENCE</h3>

          {Object.values(workData?.workTitles || {}).map(
            (title, index) => (
              <div key={index} className="block6">

                <strong>{title}</strong>

                <p>
                  {Object.values(workData?.workDesc || {})[index] || ""}
                </p>

              </div>
            )
          )}

          {/* PROJECTS */}
          <h3>PROJECTS</h3>

          {Object.values(projectData?.projectTitles || {}).map(
            (title, index) => (
              <div key={index} className="block6">

                <strong>{title}</strong>

                <p>
                  {Object.values(projectData?.projectDesc || {})[index] || ""}
                </p>

              </div>
            )
          )}

          {/* EDUCATION */}
          <h3>EDUCATION</h3>

          {Object.values(educationData?.educationTitles || {}).map(
            (title, index) => (
              <div key={index} className="block6">

                <strong>{title}</strong>

                <p>
                  {Object.values(educationData?.educationDesc || {})[index] || ""}
                </p>

              </div>
            )
          )}

          {/* AWARDS */}
          <h3>AWARDS & RECOGNITION</h3>

          <p>
            {(awardData?.awards || "")
              .split(",")
              .map((a, i) => (
                <span key={i}>• {a}<br /></span>
              ))}
          </p>

        </div>

      </div>

    </div>
  );
};

export default Theme6;
