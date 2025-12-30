const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const { parseCVWithAI } = require("../services/aiparser.service");
const { parseFileOCR } = require("../services/ocrParser.service");
const { calculateATS } = require("../services/ats.service");
const { matchJD } = require("../services/jdMatch.service");

const CV_UPLOAD_DIR = path.join(__dirname, "../uploads/cv");
const EXCEL_DIR = path.join(__dirname, "../uploads/excel");

// Ensure directories exist
[CV_UPLOAD_DIR, EXCEL_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

exports.uploadCV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let extractedText = "";

    // Extract text based on file type
    if (ext === ".pdf") {
      extractedText = await parseFileOCR(filePath);
    } else if (ext === ".docx") {
      const mammoth = require("mammoth");
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(400).json({ error: "Could not extract readable text from CV" });
    }

    // AI parsing
    const parsedData = await parseCVWithAI(extractedText);

    // Ensure arrays exist
    parsedData.skills = parsedData.skills || [];
    parsedData.education = parsedData.education || [];
    parsedData.experience = parsedData.experience || [];
    parsedData.projects = parsedData.projects || [];
    parsedData.certifications = parsedData.certifications || [];

    // Separate phone numbers
    parsedData.phone = (parsedData.phone || "")
      .match(/(\+?\d[\d\s]{5,}\d)/g) || [];

    // Calculate ATS
    const atsResult = calculateATS(extractedText);
    parsedData.atsScore = atsResult.atsScore;

    // Build highlights
    parsedData.highlights = [];
    if (/experience/i.test(extractedText)) parsedData.highlights.push("Experience section present");
    if (/education/i.test(extractedText)) parsedData.highlights.push("Education section present");
    if (/skills/i.test(extractedText)) parsedData.highlights.push("Skills section present");
    if (atsResult.atsScore >= 70) parsedData.highlights.push("Good keyword coverage and formatting");

    // Build improvements
    parsedData.improvements = atsResult.issues.length
      ? atsResult.issues
      : ["Add measurable achievements, tools, certifications, and role-specific keywords"];

    // Save Excel
    const wb = XLSX.utils.book_new();
    const wsData = [["Field", "Value"]];
    for (const key in parsedData) {
      wsData.push([
        key,
        Array.isArray(parsedData[key])
          ? parsedData[key].join(", ")
          : parsedData[key],
      ]);
    }
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "CV_Data");

    const safeName = (parsedData.name || "Candidate").replace(/[^a-zA-Z0-9]/g, "_");
    const excelFileName = `${safeName}_parsed.xlsx`;
    XLSX.writeFile(wb, path.join(EXCEL_DIR, excelFileName));

    res.json({
      parsedData,
      uploadedCV: req.file.filename,
      excelFile: excelFileName,
      rawText: extractedText
    });
  } catch (err) {
    console.error("UploadCV error:", err);
    res.status(500).json({ error: "CV processing failed" });
  }
};

exports.checkATS = async (req, res) => {
  try {
    const { rawText } = req.body;
    if (!rawText) return res.status(400).json({ score: 0 });

    const atsResult = calculateATS(rawText);
    res.json({ score: atsResult.atsScore, issues: atsResult.issues });
  } catch (err) {
    res.status(500).json({ error: "ATS check failed" });
  }
};

exports.matchJD = async (req, res) => {
  try {
    const { rawText, jobDescription } = req.body;
    if (!rawText || !jobDescription) return res.status(400).json({ matchPercentage: 0 });

    const jdResult = matchJD(rawText, jobDescription); // service
    res.json(jdResult); // { matchPercentage, matchedSkills, missingSkills }
  } catch (err) {
    console.error("JD matching error:", err);
    res.status(500).json({ error: "JD matching failed" });
  }
};
