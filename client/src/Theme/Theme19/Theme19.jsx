import React, { useContext } from "react";
import ResumeContext from "../../Context/ResumeContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Theme19.css";

const Theme19 = () => {
  const { themeData } = useContext(ResumeContext);

  const {
    personalData,
    educationData,
    workData,
    projectData,
    awardData,
  } = themeData || {};

  return (
    <div className="theme19-page">
      <div className="theme19-sheet">

        {/* HEADER */}
        <div className="t19-header">
          <h1>{personalData?.name || "Morgan Maxwell"}</h1>

          <div className="t19-subtitle">
            <span></span>
            <h3>{personalData?.profile || "Web Developer"}</h3>
            <span></span>
          </div>
        </div>

        {/* BODY */}
        <div className="t19-body">

          {/* LEFT COLUMN */}
          <div className="t19-left">

            <ul className="t19-contact">
              <li>
                <FiPhone />
                <span>{personalData?.phone}</span>
              </li>
              <li>
                <FiMail />
                <span>{personalData?.email}</span>
              </li>
              <li>
                <FiMapPin />
                <span>{personalData?.address}</span>
              </li>
            </ul>

            <div className="t19-section">
              <h2>Skills</h2>
              <ul>
                {(personalData?.skill || "").split(",").map((s, i) => (
                  <li key={i}>{s.trim()}</li>
                ))}
              </ul>
            </div>

            <div className="t19-section">
              <h2>Education</h2>
              {Object.keys(educationData?.educationTitles || {}).map((key, i) => (
                <div key={i} className="t19-edu">
                  <b>{educationData.educationTitles[key]}</b>
                  <p>{educationData.educationDesc[`eDescription${i + 1}`]}</p>
                </div>
              ))}
            </div>

          </div>

          {/* DIVIDER */}
          <div className="t19-divider"></div>

          {/* RIGHT COLUMN */}
          <div className="t19-right">

            <div className="t19-section">
              <h2>Profile</h2>
              <p>{personalData?.summary}</p>
            </div>

            <div className="t19-section">
              <h2>Experience</h2>
              {Object.keys(workData?.workTitles || {}).map((key, i) => (
                <div key={i} className="t19-exp">
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

            <div className="t19-section">
              <h2>Projects</h2>
              {Object.keys(projectData?.projectTitles || {}).map((key, i) => (
                <div key={i} className="t19-exp">
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

            <div className="t19-section">
              <h2>Awards</h2>
              <ul>
                {(awardData?.awards || "").split(",").map((a, i) => (
                  <li key={i}>{a.trim()}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Theme19;
