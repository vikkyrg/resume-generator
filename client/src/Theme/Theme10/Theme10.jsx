import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme10.css";

const Theme10 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme10">

      {/* ================= HEADER ================= */}
      <div className="t10-header">

        <div className="t10-header-left">
          <h1>{personalData?.name || "GEORGE MURPHY"}</h1>
          <h2>{personalData?.profile || "PROJECT MANAGER"}</h2>
        </div>

        <div className="t10-header-right">
          <img
            src={
              personalData?.profileImage ||
              "https://via.placeholder.com/140"
            }
            alt="profile"
          />
        </div>

      </div>

      {/* ================= CONTACT + PROFILE ================= */}
      <div className="t10-top">

        <div className="t10-contact">
          <h3>CONTACT</h3>

          <div className="t10-contact-item">
            <FiPhone className="t10-icon" />
            <span>{personalData?.phone || "123-456-7890"}</span>
          </div>

          <div className="t10-contact-item">
            <FiMail className="t10-icon" />
            <span>{personalData?.email || "email@gmail.com"}</span>
          </div>

          <div className="t10-contact-item">
            <FiMapPin className="t10-icon" />
            <span>{personalData?.address || "Your Address"}</span>
          </div>
        </div>

        <div className="t10-profile">
          <h3>PROFILE</h3>
          <p>
            {personalData?.summary ||
              "Experienced and hardworking Project Manager with more than 15 years of experience driving unique projects and leading effective teams."}
          </p>
        </div>

      </div>

      <div className="t10-divider"></div>

      {/* ================= BODY ================= */}
      <div className="t10-body">

        {/* ================= LEFT COLUMN ================= */}
        <div className="t10-left">

          <h3>EDUCATION</h3>

          {Object.values(educationData?.educationTitles || {}).map(
            (title, index) => (
              <div key={index} className="t10-edu-block">
                <strong>{title}</strong>
                <p>
                  {Object.values(
                    educationData?.educationDesc || {}
                  )[index]}
                </p>
              </div>
            )
          )}

          <div className="t10-small-divider"></div>

          <h3>SKILLS</h3>
          <ul>
            {(personalData?.skill || "")
              .split(",")
              .map((s, i) => (
                <li key={i}>{s.trim()}</li>
              ))}
          </ul>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="t10-right">

          <h3>EXPERIENCE</h3>

          {Object.values(workData?.workTitles || {}).map(
            (title, index) => (
              <div key={index} className="t10-exp-block">
                <p className="t10-role">{title}</p>
                <p className="t10-company">
                  {Object.values(
                    workData?.workCompany || {}
                  )[index]}
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

          <h3>PROJECTS</h3>

          {Object.values(projectData?.projectTitles || {}).map(
            (title, index) => (
              <div key={index} className="t10-exp-block">
                <p className="t10-role">{title}</p>
                <ul>
                  {(Object.values(projectData?.projectDesc || {})[index] || "")
                    .split(",")
                    .map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                </ul>
              </div>
            )
          )}

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

export default Theme10;
