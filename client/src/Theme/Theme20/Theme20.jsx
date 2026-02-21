import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme20.css";

const Theme20 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme20-page">

      {/* ================= HEADER ================= */}
      <header className="t20-header">
        <div className="t20-header-left">
          <h1 className="t20-name">{personalData?.name || "Your Name"}</h1>
          <div className="t20-name-underline"></div>
          <h2>{personalData?.profile || "Job Title"}</h2>
        </div>

        <div className="t20-header-right">
          <div><FiPhone /> {personalData?.phone || "+123-456-7890"}</div>
          <div><FiMail /> {personalData?.email || "email@example.com"}</div>
          <div><FiMapPin /> {personalData?.address || "Your Address"}</div>
        </div>
      </header>

      <div className="t20-top-divider"></div>

      {/* ================= BODY ================= */}
      <div className="t20-body">

        {/* ========== LEFT COLUMN ========== */}
        <div className="t20-left">

          <section className="t20-section">
            <h3><span>SUMMARY</span></h3>
            <p>
              {personalData?.summary ||
                "Write a professional executive summary here."}
            </p>
          </section>

          <section className="t20-section">
            <h3><span>EDUCATION</span></h3>

            {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
              <div key={i} className="t20-edu">
                <b>{educationData.educationTitles[key]}</b>
                <span className="t20-sub">
                  {educationData.educationYears?.[`eYear${i + 1}`] || ""}
                </span>
                <p>
                  {(educationData.educationDesc[`eDescription${i + 1}`] || "")
                    .split(",")[0]}
                </p>
              </div>
            ))}
          </section>

          <section className="t20-section">
            <h3><span>SKILLS</span></h3>
            <ul className="t20-list">
              {(personalData?.skill || "")
                .split(",")
                .map((s, i) => (
                  <li key={i}>{s.trim()}</li>
                ))}
            </ul>
          </section>

          <section className="t20-section">
            <h3><span>AWARDS</span></h3>
            <ul className="t20-list">
              {(awardData?.awards || "")
                .split(",")
                .map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
            </ul>
          </section>

        </div>

        <div className="t20-vertical-divider"></div>

        {/* ========== RIGHT COLUMN ========== */}
        <div className="t20-right">

          <section className="t20-section">
            <h3><span>PROFESSIONAL EXPERIENCE</span></h3>

            {Object.keys(workData?.workTitles || {}).map((key, i) => (
              <div key={i} className="t20-exp">
                <b>{workData.workTitles[key]}</b>
                <span className="t20-sub">
                  {workData.workYears?.[`wYear${i + 1}`] || ""}
                </span>

                <ul>
                  {(workData.workDesc[`wDescription${i + 1}`] || "")
                    .split(",")
                    .map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="t20-section">
            <h3><span>PROJECTS</span></h3>

            {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
              <div key={i} className="t20-exp">
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
          </section>

        </div>
      </div>
    </div>
  );
};

export default Theme20;
