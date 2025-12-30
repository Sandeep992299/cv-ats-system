const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function parseCVWithAI(text) {
  if (!text || text.trim().length < 10) {
    console.warn("No text to parse!");
    return {
      name: "N/A",
      email: "N/A",
      phone: "N/A",
      education: [],
      experience: [],
      projects: [],
      skills: [],
      languages: [],
      certifications: [],
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a professional ATS CV parser.

Convert the following CV text into STRICT JSON. Return ONLY JSON.
Schema:
{
  "name": "",
  "email": "",
  "phone": "",
  "education": [],
  "experience": [],
  "projects": [],
  "skills": [],
  "languages": [],
  "certifications": []
}

CV TEXT:
${text}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const cleaned = response.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);

  } catch (err) {
    console.error("Gemini AI parsing failed:", err);
    return {
      name: "N/A",
      email: "N/A",
      phone: "N/A",
      education: [],
      experience: [],
      projects: [],
      skills: [],
      languages: [],
      certifications: [],
    };
  }
}

module.exports = { parseCVWithAI };
