import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme18.css";

const Theme18 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData,
  } = themeData || {};

  return (
    <div className="theme18-page">

      {/* ================= HEADER ================= */}
      <div className="t18-header">
        <img
          className="t18-photo"
          src={personalData?.profileImage || "https://via.placeholder.com/140"}
          alt="profile"
        />

        <div className="t18-header-text">
          <h1>{personalData?.name || "Donna Stroupe"}</h1>
          <h3>{personalData?.profile || "Developer"}</h3>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="t18-body">

        {/* ================= LEFT ================= */}
        <div className="t18-left">

          {/* CONTACT */}
          <div className="t18-contact-card">
            <p>
              <FiPhone className="t18-icon" />
              <span>{personalData?.phone || "9090909090"}</span>
            </p>
            <p>
              <FiMail className="t18-icon" />
              <span>{personalData?.email || "email@gmail.com"}</span>
            </p>
            <p>
              <FiMapPin className="t18-icon" />
              <span>{personalData?.address || "Location"}</span>
            </p>
          </div>

          {/* EDUCATION */}
          <div className="t18-section">
            <h2>Education</h2>
            {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
              <div key={i} className="t18-item">
                <b>{educationData.educationTitles[key]}</b>
                <p>{educationData.educationDesc[`eDescription${i + 1}`]}</p>
              </div>
            ))}
          </div>

          <div className="t18-divider" />

          {/* SKILLS */}
          <div className="t18-section">
            <h2>Skills</h2>
            <ul>
              {(personalData?.skill || "")
                .split(",")
                .map((s, i) => (
                  <li key={i}>{s.trim()}</li>
                ))}
            </ul>
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="t18-right">

          {/* ABOUT */}
          <div className="t18-section">
            <h2>About Me</h2>
            <p className="t18-about">
              {personalData?.summary ||
                "Driven professional with strong technical skills and a passion for building scalable applications."}
            </p>
          </div>

          <div className="t18-divider" />

          {/* WORK EXPERIENCE */}
          <div className="t18-section">
            <h2>Work Experience</h2>
            {Object.keys(workData?.workTitles || {}).map((key, i) => (
              <div key={i} className="t18-item">
                <b>{workData.workTitles[key]}</b>
                <ul>
                  {workData.workDesc[`wDescription${i + 1}`]
                    ?.split(",")
                    .map((w, idx) => (
                      <li key={idx}>{w.trim()}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="t18-divider" />

          {/* PROJECTS */}
          <div className="t18-section">
            <h2>Projects</h2>
            {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
              <div key={i} className="t18-item">
                <b>{projectData.projectTitles[key]}</b>
                <ul>
                  {projectData.projectDesc[`pDescription${i + 1}`]
                    ?.split(",")
                    .map((p, idx) => (
                      <li key={idx}>{p.trim()}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="t18-divider" />

          {/* AWARDS */}
          <div className="t18-section">
            <h2>Awards</h2>
            <ul>
              {(awardData?.awards || "")
                .split(",")
                .map((a, i) => (
                  <li key={i}>{a.trim()}</li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Theme18;
