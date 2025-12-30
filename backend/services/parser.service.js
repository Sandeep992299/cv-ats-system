const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

async function parseCV(file) {
  const ext = file.originalname.split(".").pop().toLowerCase();
  let rawText = "";

  if (ext === "pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    rawText = pdfData.text;
  } else if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: file.path });
    rawText = result.value;
  } else {
    throw new Error("Unsupported file format");
  }

  return extractFields(rawText);
}

function extractFields(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Basic regex
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\d{7,15}/;
  
  const emailMatch = lines.find((l) => emailRegex.test(l)) || "N/A";
  const phoneMatch = lines.find((l) => phoneRegex.test(l)) || "N/A";

  // Name: first line not email/phone (can improve with NLP later)
  const name = lines.find((l) => l !== emailMatch && l !== phoneMatch) || "N/A";

  // Section-based extraction
  const education = [];
  const experience = [];
  const projects = [];
  const skills = [];
  const certifications = [];

  let currentSection = null;
  const sectionMap = {
    education: /education|degree|university|college|school/i,
    experience: /experience|worked|internship|employment|role|voluntary/i,
    projects: /project/i,
    skills: /skills|technologies|tools|competencies/i,
    certifications: /certifications|licenses/i,
  };

  for (let line of lines) {
    // Detect section
    for (let key in sectionMap) {
      if (sectionMap[key].test(line)) {
        currentSection = key;
        break;
      }
    }

    // Push line to current section
    if (currentSection) {
      switch (currentSection) {
        case "education":
          education.push(line);
          break;
        case "experience":
          experience.push(line);
          break;
        case "projects":
          projects.push(line);
          break;
        case "skills":
          skills.push(line);
          break;
        case "certifications":
          certifications.push(line);
          break;
      }
    }
  }

  return {
    name,
    email: emailMatch,
    phone: phoneMatch,
    education: education.length ? education : ["N/A"],
    experience: experience.length ? experience : ["N/A"],
    projects: projects.length ? projects : ["N/A"],
    skills: skills.length ? skills : ["N/A"],
    certifications: certifications.length ? certifications : ["N/A"],
  };
}

module.exports = { parseCV };
