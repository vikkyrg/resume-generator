import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import "./Theme7.css";

const Theme7 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme7">

      {/* ================= HEADER ================= */}
      <div className="t7-header">
        <h1>{personalData?.name || "JOHNATHON WATSON"}</h1>
        <h2>{personalData?.profile || "SALES EXECUTIVE"}</h2>
      </div>

      {/* ================= BODY ================= */}
      <div className="t7-body">

        {/* ========== LEFT COLUMN ========== */}
        <div className="t7-left">

          {/* CONTACT */}
          <h3>CONTACT</h3>
          <p>{personalData?.email || "jwatson@gmail.com"}</p>
          <p>{personalData?.phone || "(123) 456-7890"}</p>
          <p>{personalData?.address || "City, Country"}</p>

          {/* EDUCATION */}
          <h3>EDUCATION</h3>

          {Object.values(educationData?.educationTitles || {}).map(
            (title, index) => (
              <div key={index} className="t7-left-block">
                <strong>{title}</strong>
                <p>
                  {Object.values(
                    educationData?.educationDesc || {}
                  )[index]}
                </p>
              </div>
            )
          )}

          {/* SKILLS */}
          <h3>SKILLS</h3>

          <ul>
            {(personalData?.skill || "")
              .split(",")
              .map((s, i) => (
                <li key={i}>{s.trim()}</li>
              ))}
          </ul>

        </div>

        {/* ========== RIGHT COLUMN ========== */}
        <div className="t7-right">

          {/* SUMMARY */}
          <h3>SUMMARY</h3>

          <ul>
            {(personalData?.summary || "")
              .split(",")
              .map((s, i) => (
                <li key={i}>{s}</li>
              ))}
          </ul>

          {/* EXPERIENCE */}
          <h3>PROFESSIONAL EXPERIENCE</h3>

          {Object.values(workData?.workTitles || {}).map(
            (title, index) => (
              <div key={index} className="t7-right-block">

                <strong>{title}</strong>

                <p className="company">
                  {Object.values(workData?.workCompany || {})[index]}
                </p>

                <ul>
                  {(Object.values(workData?.workDesc || {})[index] || "")
                    .split(",")
                    .map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                </ul>

              </div>
            )
          )}

          {/* PROJECTS */}
          <h3>PROJECTS</h3>

          {Object.values(projectData?.projectTitles || {}).map(
            (title, index) => (
              <div key={index} className="t7-right-block">

                <strong>{title}</strong>

                <p>
                  {Object.values(projectData?.projectDesc || {})[index]}
                </p>

              </div>
            )
          )}

          {/* AWARDS */}
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

    </div>
  );
};

export default Theme7;
