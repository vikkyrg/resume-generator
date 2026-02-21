import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./Theme12.css";

const Theme12 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData,
  } = themeData || {};

  return (
    <div className="theme12-page">
      {/* ================= HEADER ================= */}
      <div className="t12-header">
        <div className="t12-photo">
          <img
            src={
              personalData?.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="profile"
          />
        </div>

        <div className="t12-header-text">
          <h1>{personalData?.name || "Your Name"}</h1>
          <h2>{personalData?.profile || "Your Designation"}</h2>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="t12-body">
        {/* LEFT COLUMN */}
        <div className="t12-left">
          {/* CONTACT */}
          <h3>Contact Details</h3>

          <div className="t12-contact">
            <div className="t12-contact-item">
              <FiMail />
              <span>{personalData?.email || "email@gmail.com"}</span>
            </div>

            <div className="t12-contact-item">
              <FiPhone />
              <span>{personalData?.phone || "0000000000"}</span>
            </div>

            <div className="t12-contact-item">
              <FiMapPin />
              <span>{personalData?.address || "Your Address"}</span>
            </div>
          </div>

          {/* EDUCATION */}
          <h3>Education</h3>

          {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
            <div key={i} className="t12-edu-block">
              <b>{educationData.educationTitles[key]}</b>
              <p>
                {(educationData.educationDesc[`eDescription${i + 1}`] || "")
                  .split(",")
                  .join(" ")}
              </p>
            </div>
          ))}

          {/* SKILLS */}
          <h3>Skills</h3>

          <ul className="t12-skill-list">
            {(personalData?.skill || "")
              .split(",")
              .map((s, i) => (
                <li key={i}>{s.trim()}</li>
              ))}
          </ul>
        </div>

        {/* RIGHT COLUMN */}
        <div className="t12-right">
          {/* SUMMARY */}
          <h3>Summary</h3>
          <p className="t12-summary">
            {personalData?.summary ||
              "Write a short professional summary here."}
          </p>

          {/* WORK EXPERIENCE */}
          <h3>Work Experience</h3>

          {Object.keys(workData?.workTitles || {}).map((key, i) => (
            <div key={i} className="t12-work-block">
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

          {/* PROJECTS */}
          <h3>Projects</h3>

          {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
            <div key={i} className="t12-work-block">
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

          {/* AWARDS */}
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

export default Theme12;
