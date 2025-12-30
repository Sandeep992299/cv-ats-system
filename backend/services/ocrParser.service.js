const pdfParse = require("pdf-parse");

async function parseFileOCR(filePath) {
  const ext = require("path").extname(filePath).toLowerCase();

  try {
    if (ext === ".pdf") {
      const dataBuffer = require("fs").readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text; // extract text directly
    } else {
      throw new Error("Unsupported file type for OCR");
    }
  } catch (err) {
    console.error("OCR failed:", err);
    return "";
  }
}

module.exports = { parseFileOCR };
