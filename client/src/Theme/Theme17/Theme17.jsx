import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme17.css";

const Theme17 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme17-page">

      {/* ================= HEADER ================= */}
      <div className="t17-header">
        <h1>{personalData?.name || "Your Name"}</h1>
        <h2>{personalData?.profile || "Job Title"}</h2>

        <div className="t17-contact">
          <span><FiPhone /> {personalData?.phone || "0000000000"}</span>
          <span><FiMapPin /> {personalData?.address || "Your Location"}</span>
          <span><FiMail /> {personalData?.email || "email@example.com"}</span>
        </div>
      </div>

      <hr className="t17-divider" />

      {/* ================= ABOUT ================= */}
      <section className="t17-section">
        <h3>ABOUT ME</h3>
        <p>
          {personalData?.summary ||
            "Write a short professional summary about yourself here."}
        </p>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="t17-section">
        <h3>EDUCATION</h3>

        {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
          <div key={i} className="t17-row">
            <div className="t17-year">
              {educationData.educationYears?.[`eYear${i + 1}`] || ""}
            </div>

            <div className="t17-content">
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
      <section className="t17-section">
        <h3>EXPERIENCE</h3>

        {Object.keys(workData?.workTitles || {}).map((key, i) => (
          <div key={i} className="t17-row">
            <div className="t17-year">
              {workData.workYears?.[`wYear${i + 1}`] || ""}
            </div>

            <div className="t17-content">
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
      <section className="t17-section">
        <h3>PROJECTS</h3>

        {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
          <div key={i} className="t17-row">
            <div className="t17-year"></div>

            <div className="t17-content">
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
      <section className="t17-section">
        <h3>SKILLS</h3>
        <ul className="t17-skills">
          {(personalData?.skill || "")
            .split(",")
            .map((s, i) => (
              <li key={i}>{s.trim()}</li>
            ))}
        </ul>
      </section>

      {/* ================= AWARDS ================= */}
      <section className="t17-section">
        <h3>AWARDS</h3>
        <ul className="t17-awards">
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

export default Theme17;
