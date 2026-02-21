import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme16.css";

const Theme16 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    projectData,
    educationData,
    workData,
    awardData
  } = themeData || {};

  return (
    <div className="theme16-page">

      {/* ================= HEADER ================= */}
      <div className="t16-header">
        <div className="t16-header-left">
          <img
            src={personalData?.profileImage || "https://via.placeholder.com/120"}
            alt="profile"
          />
        </div>

        <div className="t16-header-right">
          <h1>{personalData?.name || "Your Name"}</h1>
          <h2>{personalData?.profile || "Job Title"}</h2>

          <div className="t16-contact">
            <span><FiPhone /> {personalData?.phone || "0000000000"}</span>
            <span><FiMail /> {personalData?.email || "email@example.com"}</span>
            <span><FiMapPin /> {personalData?.address || "Your Location"}</span>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <section className="t16-section">
        <h3>ABOUT ME</h3>
        <p>
          {personalData?.summary ||
            "Write a short professional summary about yourself here."}
        </p>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="t16-section">
        <h3>EDUCATION</h3>

        {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
          <div key={i} className="t16-row">
            <div className="t16-year">
              {educationData.educationYears?.[`eYear${i + 1}`] || ""}
            </div>

            <div className="t16-content">
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
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="t16-section">
        <h3>EXPERIENCE</h3>

        {Object.keys(workData?.workTitles || {}).map((key, i) => (
          <div key={i} className="t16-row">
            <div className="t16-year">
              {workData.workYears?.[`wYear${i + 1}`] || ""}
            </div>

            <div className="t16-content">
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
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="t16-section">
        <h3>PROJECTS</h3>

        {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
          <div key={i} className="t16-row">
            <div className="t16-year"></div>

            <div className="t16-content">
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
      </section>

      {/* ================= SKILLS ================= */}
      <section className="t16-section">
        <h3>SKILLS</h3>
        <div className="t16-skills">
          {(personalData?.skill || "")
            .split(",")
            .map((s, i) => (
              <span key={i}>{s.trim()}</span>
            ))}
        </div>
      </section>

      {/* ================= AWARDS ================= */}
      <section className="t16-section">
        <h3>AWARDS</h3>
        <ul className="t16-awards">
          {(awardData?.awards || "")
            .split(",")
            .map((a, i) => (
              <li key={i}>{a}</li>
            ))}
        </ul>
      </section>

    </div>
  );
};

export default Theme16;
