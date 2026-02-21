import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiBook,
  FiBriefcase,
  FiAward,
} from "react-icons/fi";
import "./Theme15.css";

const Theme15 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    projectData,
    educationData,
    workData,
    awardData,
  } = themeData || {};

  return (
    <div className="theme15-page">

      {/* ========== LEFT SIDEBAR ========== */}
      <div className="t15-sidebar">

        {/* PROFILE IMAGE */}
        <div className="t15-profile-img">
          <img
            src={
              personalData?.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="profile"
          />
        </div>

        {/* ABOUT ME */}
        <div className="t15-section">
          <div className="t15-title">
            <FiUser />
            <span>About Me</span>
          </div>
          <p className="t15-text">
            {personalData?.summary ||
              "Write a short professional summary about yourself here."}
          </p>
        </div>

        {/* CONTACT */}
        <div className="t15-section">
        <div className="t15-title">
            <FiUser />
            <span>Contact</span>
        </div>

        <div className="t15-row">
            <FiPhone />
            <span>{personalData?.phone}</span>
        </div>

        <div className="t15-row">
            <FiMail />
            <span>{personalData?.email}</span>
        </div>

        <div className="t15-row">
            <FiMapPin />
            <span>{personalData?.address}</span>
        </div>
        </div>


        {/* SKILLS */}
        <div className="t15-section">
          <div className="t15-title">
            <span>⚙</span>
            <span>Skills</span>
          </div>

          <ul className="t15-list">
            {(personalData?.skill || "")
              .split(",")
              .map((s, i) => (
                <li key={i}>{s.trim()}</li>
              ))}
          </ul>
        </div>

      </div>

      {/* ========== RIGHT CONTENT ========== */}
      <div className="t15-content">

        {/* HEADER */}
        <div className="t15-header">
          <h1>{personalData?.name || "Your Name"}</h1>
          <h2>{personalData?.profile || "Job Title"}</h2>
        </div>

        {/* EDUCATION */}
        <div className="t15-block">
          <h3><FiBook /> Education</h3>

          {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
            <div key={i} className="t15-timeline-item">
              <span className="t15-dot"></span>
              <div>
                <b>{educationData.educationTitles[key]}</b>
                <ul>
                  {(educationData.educationDesc[`eDescription${i + 1}`] || "")
                    .split(",")
                    .map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <div className="t15-block">
          <h3><FiBriefcase /> Professional Experience</h3>

          {Object.keys(workData?.workTitles || {}).map((key, i) => (
            <div key={i} className="t15-timeline-item">
              <span className="t15-dot"></span>
              <div>
                <b>{workData.workTitles[key]}</b>
                <ul>
                  {(workData.workDesc[`wDescription${i + 1}`] || "")
                    .split(",")
                    .map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* PROJECTS */}
        <div className="t15-block">
          <h3>🛠 Projects</h3>

          {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
            <div key={i} className="t15-timeline-item">
              <span className="t15-dot"></span>
              <div>
                <b>{projectData.projectTitles[key]}</b>
                <ul>
                  {(projectData.projectDesc[`pDescription${i + 1}`] || "")
                    .split(",")
                    .map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* AWARDS */}
        <div className="t15-block">
          <h3><FiAward /> Awards</h3>
          <ul className="t15-awards">
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

export default Theme15;
