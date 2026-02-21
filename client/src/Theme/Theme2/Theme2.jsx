import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme2.css";

const Theme2 = () => {

  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    projectData,
    educationData,
    workData,
    awardData
  } = themeData || {};

  return (
    <div className="theme2-page">

      {/* ================= HEADER ================= */}
      <div className="t2-header">

        <div className="t2-header-left">
          <h1>{personalData?.name || "Your Name"}</h1>
          <h3>{personalData?.profile || "Job Title"}</h3>

          <p>
            {personalData?.summary ||
              "Write a short professional summary about yourself here"}
          </p>
        </div>

        <div className="t2-header-right">
          <img
            src={
              personalData?.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="profile"
          />
        </div>

      </div>

      <hr />

      {/* ================= BODY ================= */}
      <div className="t2-body">

        {/* ---------- LEFT COLUMN ---------- */}
        <div className="t2-left">

          <h2>Contact</h2>
          <div className="t2-contact-item">
            <FiPhone className="t2-icon" />
            <div>
              <b>Phone</b><br />
              {personalData?.phone || "0000000000"}
            </div>
          </div>

          <div className="t2-contact-item">
            <FiMail className="t2-icon" />
            <div>
              <b>Email</b><br />
              {personalData?.email || "email@gmail.com"}
            </div>
          </div>

          <div className="t2-contact-item">
            <FiMapPin className="t2-icon" />
            <div>
              <b>Address</b><br />
              {personalData?.address || "Your Address"}
            </div>
          </div>

          <div className="t2-divider"></div>

          <h2>Skills</h2>

          <ul>
            {(personalData?.skill || "")
              .split(",")
              .map((s, i) => (
                <li key={i}>{s}</li>
              ))}
          </ul>

        </div>

        {/* ---------- VERTICAL LINE ---------- */}
        <div className="t2-line"></div>

        {/* ---------- RIGHT COLUMN ---------- */}
        <div className="t2-right">

          {/* PROJECTS */}
          <h2>Projects</h2>

          {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
            <div key={i} className="t2-block">

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

          <hr />

          {/* EXPERIENCE */}
          <h2>Experience</h2>

          {Object.keys(workData?.workTitles || {}).map((key, i) => (
            <div key={i} className="t2-block">

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

          <hr />

          {/* EDUCATION */}
          <h2>Education</h2>

          {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
            <div key={i} className="t2-block">

              <b>{educationData.educationTitles[key]}</b>

              <ul>
                {(educationData.educationDesc[`eDescription${i + 1}`] || "")
                  .split(",")
                  .map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
              </ul>

            </div>
          ))}

          <hr />

          {/* AWARDS */}
          <h2>Awards & Achievements</h2>

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

export default Theme2;
