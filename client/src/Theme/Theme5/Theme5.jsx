import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import "./Theme5.css";

const Theme5 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    workData,
    educationData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme5">

      {/* ================= HEADER ================= */}
      <div className="theme5-header">
        <div className="theme5-name-box">
          <h1>{personalData?.name || "Jimmy Eriksen"}</h1>
          <p>{personalData?.profile || "Web Developer"}</p>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="theme5-body">

        {/* ================= LEFT ================= */}
        <div className="theme5-left">

          <h3>DETAILS</h3>
          <p>{personalData?.email || "email@gmail.com"}</p>
          <p>{personalData?.phone || "9090300300"}</p>
          <p>{personalData?.address || "City, Country"}</p>

          <h3>SKILLS</h3>

          {personalData?.skill
            ?.split(",")
            .map((skill, i) => (
              <div key={i} className="skill-row">
                <span>{skill.trim()}</span>
              </div>
            ))}

        </div>

        {/* ================= RIGHT ================= */}
        <div className="theme5-right">

          <h2>PROFILE</h2>
          <p>{personalData?.summary || "Write profile summary here"}</p>

          <h2>PROJECTS</h2>

          {Object.values(projectData?.projectTitles || {}).map(
            (title, index) => (
              <div key={index} className="right-block">
                <strong>{title}</strong>
                <p>
                  {Object.values(projectData?.projectDesc || {})[index]}
                </p>
              </div>
            )
          )}

          <h2>EMPLOYMENTS</h2>

          {Object.values(workData?.workTitles || {}).map(
            (title, index) => (
              <div key={index} className="right-block">
                <strong>{title}</strong>
                <p>
                  {Object.values(workData?.workDesc || {})[index]}
                </p>
              </div>
            )
          )}

          <h2>EDUCATIONS</h2>

          {Object.values(educationData?.educationTitles || {}).map(
            (title, index) => (
              <div key={index} className="right-block">
                <strong>{title}</strong>
                <p>
                  {Object.values(
                    educationData?.educationDesc || {}
                  )[index]}
                </p>
              </div>
            )
          )}

          {/* ================= AWARDS ================= */}

          <h2>AWARDS & ACHIEVEMENTS</h2>

          <ul>
            {(awardData?.awards || "")
              .split(",")
              .map((award, i) => (
                <li key={i}>{award}</li>
              ))}
          </ul>

        </div>

      </div>

    </div>
  );
};

export default Theme5;
