import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import "./Theme3.css";

const Theme3 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme3">

      {/* ================= HEADER ================= */}

      <div className="theme3-header">

        <h1>
          <span>{personalData?.name || "Your Name"}</span>{" "}
        </h1>

        <p className="title">
          {personalData?.profile || "Web Developer"}
        </p>

        <p>{personalData?.email || "email@example.com"}</p>
        <p>{personalData?.phone || "0000000000"}</p>

      </div>

      <hr />

      {/* ================= SUMMARY ================= */}

      <div className="row">
        <div className="left">Summary</div>

        <div className="right">
          {personalData?.summary || "Write your summary here"}
        </div>
      </div>

      {/* ================= EXPERIENCE ================= */}

      <div className="row">
        <div className="left">Experience</div>

        <div className="right">

          {Object.values(workData?.workTitles || {}).map(
            (title, index) => (
              <div key={index} className="block">

                <strong>{title}</strong>

                <p>
                  {Object.values(workData?.workDesc || {})[index]}
                </p>

              </div>
            )
          )}

        </div>
      </div>

      {/* ================= PROJECTS ================= */}

      <div className="row">
        <div className="left">Projects</div>

        <div className="right">

          {Object.values(projectData?.projectTitles || {}).map(
            (title, index) => (
              <div key={index} className="block">

                <strong>{title}</strong>

                <p>
                  {Object.values(projectData?.projectDesc || {})[index]}
                </p>

              </div>
            )
          )}

        </div>
      </div>

      {/* ================= EDUCATION ================= */}

      <div className="row">
        <div className="left">Education</div>

        <div className="right">

          {Object.values(educationData?.educationTitles || {}).map(
            (title, index) => (
              <div key={index} className="block">

                <strong>{title}</strong>

                <p>
                  {Object.values(educationData?.educationDesc || {})[index]}
                </p>

              </div>
            )
          )}

        </div>
      </div>

      {/* ================= SKILLS ================= */}

      <div className="row">
        <div className="left">Skills</div>

        <div className="right skills">

          {personalData?.skill
            ?.split(",")
            .map((skill, i) => (
              <span key={i}>• {skill.trim()}</span>
            ))}

        </div>
      </div>

      {/* ================= AWARDS ================= */}

      <div className="row">
        <div className="left">Awards & Achievements</div>

        <div className="right">

          {(awardData?.awards || "")
            .split(",")
            .map((award, i) => (
              <p key={i}>• {award}</p>
            ))}

        </div>
      </div>

    </div>
  );
};

export default Theme3;
