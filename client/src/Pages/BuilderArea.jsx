import React, { useContext, useState, useEffect, useRef } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import UserDataCollect from "../Components/UserDataCollect/UserDataCollect";
import Footer from "../Components/Footer/Footer";
import ResumeContext from "../Context/ResumeContext";

import "./BuilderArea.css";

import PropagateLoader from "react-spinners/PropagateLoader";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BuilderArea = ({ theme }) => {
  const navigate = useNavigate();

  const { loading, handlePrint, componentRef, themeData } = useContext(ResumeContext);

  // ================= ATS SCORE STATE =================
  const [atsScore, setAtsScore] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);
  const atsRef = useRef(null);


  // Trigger animation when atsScore changes
  useEffect(() => {
  if (atsScore !== null) {
    setDisplayScore(0);

    const timeout = setTimeout(() => {
      setDisplayScore(atsScore);

      // 🔥 Auto scroll to ATS section
      if (atsRef.current) {
        atsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

    }, 100);

    return () => clearTimeout(timeout);
  }
}, [atsScore]);


  // Determine color based on score
  const getScoreColor = (score) => {
    if (score < 40) return "#FF4D4D"; // Red
    if (score <= 65) return "#FFD700"; // Yellow
    return "#4CAF50"; // Green
  };

  // ================= ADVANCED ATS CALCULATION =================
  const calculateATSScore = () => {

  let score = 0;

  const {
    personalData = {},
    projectData = {},
    educationData = {},
    workData = {},
    awardData = {}
  } = themeData || {};

  // Helper function to check real content
  const isValidText = (text) => {
    if (!text) return false;
    const trimmed = text.trim().toLowerCase();
    if (
      trimmed === "" ||
      trimmed === "your name" ||
      trimmed === "email address" ||
      trimmed === "phone number" ||
      trimmed.includes("write") ||
      trimmed.includes("enter")
    ) {
      return false;
    }
    return true;
  };

  // ================= PERSONAL INFO (10) =================
  if (
    isValidText(personalData.name) &&
    isValidText(personalData.email) &&
    isValidText(personalData.phone)
  ) {
    score += 10;
  }

  // ================= SUMMARY (15) =================
  if (isValidText(personalData.summary)) {
    const length = personalData.summary.trim().length;

    if (length > 120) score += 15;
    else if (length > 70) score += 10;
    else if (length > 40) score += 5;
  }

  // ================= SKILLS (15) =================
  if (isValidText(personalData.skill)) {
    const skills = personalData.skill
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (skills.length >= 8) score += 15;
    else if (skills.length >= 5) score += 10;
    else if (skills.length >= 3) score += 5;
  }

  // ================= PROJECTS (15) =================
  const projectCount = Object.keys(projectData.projectTitles || {})
    .filter(key => isValidText(projectData.projectTitles[key]))
    .length;

  if (projectCount >= 3) score += 15;
  else if (projectCount === 2) score += 10;
  else if (projectCount === 1) score += 5;

  // ================= EXPERIENCE (20) =================
  const workCount = Object.keys(workData.workTitles || {})
    .filter(key => isValidText(workData.workTitles[key]))
    .length;

  if (workCount >= 3) score += 20;
  else if (workCount === 2) score += 15;
  else if (workCount === 1) score += 8;

  // ================= EDUCATION (10) =================
  const educationCount = Object.keys(educationData.educationTitles || {})
    .filter(key => isValidText(educationData.educationTitles[key]))
    .length;

  if (educationCount >= 2) score += 10;
  else if (educationCount === 1) score += 6;

  // ================= AWARDS (5) =================
  const awardCount = Object.keys(awardData.awardTitles || {})
    .filter(key => isValidText(awardData.awardTitles[key]))
    .length;

  if (awardCount >= 1) score += 5;

  // ================= KEYWORDS (10) =================
  if (isValidText(personalData.summary) || isValidText(personalData.skill)) {

    const importantKeywords = [
      "react",
      "node",
      "javascript",
      "mongodb",
      "express",
      "api",
      "developed",
      "designed",
      "implemented"
    ];

    let keywordMatches = 0;

    const fullText = `
      ${personalData.summary || ""}
      ${personalData.skill || ""}
    `.toLowerCase();

    importantKeywords.forEach(keyword => {
      if (fullText.includes(keyword)) keywordMatches++;
    });

    if (keywordMatches >= 6) score += 10;
    else if (keywordMatches >= 3) score += 6;
    else if (keywordMatches >= 1) score += 3;
  }

  if (score > 100) score = 100;

  setAtsScore(score);
};


  const handleDownloadPDF = () => {
    const resume = document.getElementById("theme-box-border");
    html2canvas(resume, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("resume.pdf");
    });
  };

  const handleSelectTemplate = () => {
    navigate("/templates");
  };

  // Speedometer constants
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <>
      {loading && <PropagateLoader id="spinner" color="#319795" size={30} />}

      <div id="main-box"style={{display: "flex",flexWrap: "wrap",gap: "20px",justifyContent: "center",padding: "20px"}}>
        <UserDataCollect />
        <div
  id="theme-box-border"
  ref={componentRef}
  style={{
    width: "100%",
    maxWidth: "794px",
    overflowX: "auto"
  }}
>

          {theme}
        </div>
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="d-flex flex-wrap justify-content-center">
  <Button
    className="mx-3 my-5"
    px={8}
    py={6}
    rounded="full"
    fontWeight="semibold"
    bgGradient="linear(to-r, teal.400, blue.500)"
    color="white"
    transition="all 0.3s ease"
    _hover={{
      transform: "translateY(-4px)",
      boxShadow: "xl",
      bgGradient: "linear(to-r, teal.500, blue.600)",
    }}
    _active={{
      transform: "scale(0.96)",
    }}
    onClick={handlePrint}
  >
    Print
  </Button>

  <Button
    className="mx-3 my-5"
    px={8}
    py={6}
    rounded="full"
    fontWeight="semibold"
    bgGradient="linear(to-r, purple.400, pink.500)"
    color="white"
    transition="all 0.3s ease"
    _hover={{
      transform: "translateY(-4px)",
      boxShadow: "xl",
      bgGradient: "linear(to-r, purple.500, pink.600)",
    }}
    _active={{
      transform: "scale(0.96)",
    }}
    onClick={calculateATSScore}
  >
    Check ATS Score
  </Button>

  <Button
    className="mx-3 my-5"
    px={8}
    py={6}
    rounded="full"
    fontWeight="semibold"
    bgGradient="linear(to-r, teal.400, cyan.500)"
    color="white"
    transition="all 0.3s ease"
    _hover={{
      transform: "translateY(-4px)",
      boxShadow: "xl",
      bgGradient: "linear(to-r, teal.500, cyan.600)",
    }}
    _active={{
      transform: "scale(0.96)",
    }}
    onClick={handleSelectTemplate}
  >
    Select New Template
  </Button>
</div>


      {/* ================= ATS SCORE SPEEDOMETER UI ================= */}
        {atsScore !== null && (
          <div ref={atsRef} className="ats-container" style={{ 
            textAlign: "center", 
            padding: "40px 0",
            fontFamily: "'Inter', sans-serif" 
          }}>
            <div style={{ 
              position: "relative", 
              display: "inline-block",
              filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.08))" 
            }}>
              <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
                <defs>
                  {/* Gradient for a more premium look */}
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={getScoreColor(atsScore)} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={getScoreColor(atsScore)} />
                  </linearGradient>
                  {/* Subtle shadow for the progress bar */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Circle (Track) */}
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke="#F1F5F9"
                  strokeWidth="14"
                  fill="transparent"
                />

                {/* Animated Progress Circle */}
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke="url(#scoreGradient)"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray={circumference}
                  style={{
                    strokeDashoffset: offset,
                    transition: "stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    strokeLinecap: "round",
                    filter: "url(#glow)"
                  }}
                />
              </svg>

              {/* Center Text Content */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%"
                }}
              >
                <h2 style={{ 
                  margin: 0, 
                  fontSize: "36px", 
                  fontWeight: "800", 
                  color: "#1E293B",
                  letterSpacing: "-1px"
                }}>
                  {atsScore}<span style={{ fontSize: "18px", color: "#94A3B8" }}>%</span>
                </h2>
                <p style={{ 
                  margin: 0, 
                  fontSize: "10px", 
                  fontWeight: "700", 
                  color: "#64748B", 
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginTop: "-2px"
                }}>
                  ATS Score
                </p>
              </div>
            </div>
            
            {/* Optional status indicator for extra polish */}
            <div style={{
              marginTop: "15px",
              fontSize: "14px",
              fontWeight: "500",
              color: getScoreColor(atsScore),
              opacity: 0.9
            }}>
              {atsScore >= 80 ? "✨ Strong Match" : atsScore >= 50 ? "⚡ Good Match" : "🔍 Needs Optimization"}
            </div>
          </div>
        )}

      <Footer />
    </>
  );
};

export default BuilderArea;