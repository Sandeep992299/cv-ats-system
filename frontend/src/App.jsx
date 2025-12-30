import React, { useState } from "react";
import UploadCV from "./components/UploadCV";
import { checkATS, matchJD } from "./api";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaTools,
  FaCertificate,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./App.css";

export default function App() {
  const [cvData, setCvData] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [jdScore, setJdScore] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleATS = async () => {
    try {
      const res = await checkATS();
      setAtsScore(res.data.score);
    } catch (err) {
      alert("ATS check failed");
      console.error(err);
    }
  };

  const handleJDMatch = async () => {
    if (!jobDescription) return alert("Paste job description first");
    try {
      const res = await matchJD(jobDescription);
      setJdScore(res.data.matchScore);
    } catch (err) {
      alert("JD matching failed");
      console.error(err);
    }
  };

  return (
    <div className="container app-container">
      <h1 className="neon-title">CV ATS System</h1>

      {/* Upload */}
      <UploadCV setData={setCvData} />

      {cvData && (
        <div className="glass-card">
          {/* Basic Info */}
          <div className="basic-info">
            <div><FaUser /> {cvData.name || "N/A"}</div>
            <div><FaEnvelope /> {cvData.email || "N/A"}</div>
            <div><FaPhone /> {cvData.phone || "N/A"}</div>
          </div>

          {/* Main Grid */}
          <div className="grid-layout">
            {/* Education */}
            <div className="card-section">
              <h3><FaGraduationCap /> Education</h3>
              <ul>
                {cvData.education?.length
                  ? cvData.education.map((edu, i) => (
                      <li key={i}>
                        <strong>{edu.degree}</strong> at {edu.institution} ({edu.start_date} - {edu.end_date})<br/>
                        Field: {edu.field_of_study}, GPA: {edu.gpa}<br/>
                        {edu.details}
                      </li>
                    ))
                  : <li>N/A</li>}
              </ul>
            </div>

            {/* Experience */}
            <div className="card-section">
              <h3><FaBriefcase /> Experience</h3>
              <ul>
                {cvData.experience?.length
                  ? cvData.experience.map((exp, i) => (
                      <li key={i}>
                        <strong>{exp.title}</strong> at {exp.company} ({exp.start_date} - {exp.end_date})<br/>
                        {exp.description}
                      </li>
                    ))
                  : <li>N/A</li>}
              </ul>
            </div>

            {/* Projects */}
            <div className="card-section">
              <h3><FaProjectDiagram /> Projects</h3>
              <ul>
                {cvData.projects?.length
                  ? cvData.projects.map((p, i) => (
                      <li key={i}>
                        <strong>{p.title}</strong>: {p.description}
                      </li>
                    ))
                  : <li>N/A</li>}
              </ul>
            </div>

            {/* Skills */}
            <div className="card-section">
              <h3><FaTools /> Skills</h3>
              <ul className="tag-list">
                {cvData.skills?.length
                  ? cvData.skills.map((s, i) => <li key={i}>{typeof s === "string" ? s : s.name}</li>)
                  : <li>N/A</li>}
              </ul>
            </div>

            {/* Certifications */}
            <div className="card-section">
              <h3><FaCertificate /> Certifications</h3>
              <ul>
                {cvData.certifications?.length
                  ? cvData.certifications.map((c, i) => <li key={i}>{typeof c === "string" ? c : c.name}</li>)
                  : <li>N/A</li>}
              </ul>
            </div>
          </div>

          {cvData && (
  <div className="glass-card">
    {/* Basic Info ... */}
    <div className="analysis-wrapper">
      <div className="highlight success">
        <h3><FaCheckCircle /> Strong Highlights</h3>
        <ul>
          {cvData.highlights?.length
            ? cvData.highlights.map((h, i) => <li key={i}>{h}</li>)
            : <li>N/A</li>}
        </ul>
      </div>

      <div className="highlight warning">
        <h3><FaExclamationTriangle /> Needs Improvement</h3>
        <ul>
          {cvData.improvements?.length
            ? cvData.improvements.map((i, idx) => <li key={idx}>{i}</li>)
            : <li>N/A</li>}
        </ul>
      </div>
    </div>

    {/* ATS Score */}
    <div style={{ marginTop: "25px" }}>
      <p className="neon-text">ATS Score: {cvData.atsScore ?? "N/A"}/100</p>
    </div>
  </div>
)}


          {/* JD Match */}
          <div className="jd-box">
            <textarea
              rows="5"
              placeholder="Paste Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button className="neon-btn" onClick={handleJDMatch}>
              Match Job Description
            </button>
            {jdScore && (
              <p className="neon-text">
                JD Match Score: {jdScore}%
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
