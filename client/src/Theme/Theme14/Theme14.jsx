import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme14.css";

const Theme14 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData
  } = themeData || {};

  return (
    <div className="theme14-page">

      {/* HEADER */}
      <div className="t14-header">
        <img
          className="t14-photo"
          src={personalData?.profileImage || "https://via.placeholder.com/200"}
          alt="profile"
        />

        <div className="t14-header-text">
          <h1>{personalData?.name || "MICHAEL ROBINSON"}</h1>
          <div className="t14-line"></div>
          <h2>{personalData?.profile || "BUSINESS ANALYST"}</h2>
        </div>
      </div>

      {/* CONTACT BAR */}
      <div className="t14-contact">
        <div><FiPhone /> {personalData?.phone}</div>
        <div><FiMail /> {personalData?.email}</div>
        <div><FiMapPin /> {personalData?.address}</div>
      </div>

      {/* PROFILE */}
      <div className="t14-profile">
        <h3>PROFESSIONAL PROFILE</h3>
        <p>{personalData?.summary}</p>
      </div>

      {/* BODY */}
      <div className="t14-body">

        {/* LEFT */}
        <div className="t14-left">

          <div className="t14-box">EDUCATION</div>
          {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
            <div key={i} className="t14-item">
              <strong>{educationData.educationTitles[key]}</strong>
              <p>{educationData.educationDesc[`eDescription${i + 1}`]}</p>
            </div>
          ))}

          <div className="t14-box">SKILLS</div>
          <ul>
            {(personalData?.skill || "").split(",").map((s, i) => (
              <li key={i}>{s.trim()}</li>
            ))}
          </ul>

          <div className="t14-box">AWARDS</div>
          <ul>
            {(awardData?.awards || "").split(",").map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>

        </div>

        {/* RIGHT */}
        <div className="t14-right">

          <h3>JOB EXPERIENCE</h3>
          {Object.keys(workData?.workTitles || {}).map((key, i) => (
            <div key={i} className="t14-item">
              <strong>{workData.workTitles[key]}</strong>
              <p>{workData.workDesc[`wDescription${i + 1}`]}</p>
            </div>
          ))}

          <h3>PROJECTS</h3>
          {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
            <div key={i} className="t14-item">
              <strong>{projectData.projectTitles[key]}</strong>
              <p>{projectData.projectDesc[`pDescription${i + 1}`]}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Theme14;
