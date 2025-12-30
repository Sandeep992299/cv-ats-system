# CV ATS System

## Overview
The **CV ATS System** is a web-based application designed to help job seekers, recruiters, and HR professionals optimize CVs for Applicant Tracking Systems (ATS).  

**Key features:**
- Upload CVs in **PDF** or **DOCX** format
- Extract **Education, Experience, Skills, Projects, Certifications**
- Calculate an **ATS Score**
- Identify **Strong Highlights** and **Areas for Improvement**
- Match CVs against **Job Descriptions**
- Export CV data to **Excel**
- Separate multiple phone numbers automatically
- Loading animations during processing

---

## Screenshots

### 1. Upload CV Interface
![Upload CV Screenshot](./screenshots/upload-cv.png)

### 2. Parsed CV Data & ATS Score
![Parsed CV Screenshot](./screenshots/parsed-cv.png)

### 3. Job Description Match
![JD Match Screenshot](./screenshots/jd-match.png)

> Save your screenshots in a `screenshots/` folder at the root of the project.

---

## Tech Stack

- **Frontend:** React, React Icons, CSS  
- **Backend:** Node.js, Express.js  
- **Parsing Services:** OCR Parser, AI Parser  
- **ATS Scoring:** `ats.service.js`  
- **JD Matching:** `jdMatch.service.js`  
- **Excel Export:** `xlsx` library  

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

---

### 1. Clone the Repository
```bash
git clone https://github.com/Sandeep992299/cv-ats-system.git
cd cv-ats-system

2. Install Dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. Start Backend
cd backend
node server.js


Backend runs on http://localhost:5000

4. Start Frontend
cd frontend
npm start


Frontend runs on http://localhost:3000

Usage
Upload CV

Click Drag & Drop CV or select a file.

Supported formats: PDF, DOCX.

CV is parsed and ATS score is displayed.

Multiple phone numbers are separated automatically.

Loading animation shows processing progress.

View Parsed Data

Basic Info: Name, Email, Phone

Education, Experience, Projects, Skills, Certifications

Highlights: Strong points detected

Needs Improvement: Suggestions for ATS improvement

ATS Score: Out of 100

Match Job Description

Paste JD into the textarea.

Click Match Job Description.

JD Match Score appears after processing.

Loading animation shows progress.

API Endpoints
1. Upload CV

POST /api/cv/upload
Form data: file
Response:

{
  "parsedData": { ... },
  "uploadedCV": "filename.pdf",
  "excelFile": "Candidate_parsed.xlsx",
  "rawText": "Full text extracted from CV"
}

2. Check ATS

POST /api/cv/ats
Body: { "rawText": "text from CV" }
Response:

{
  "score": 60,
  "issues": ["Add measurable achievements, tools, certifications, and role-specific keywords"]
}

3. Match Job Description

POST /api/cv/match-jd
Body: { "rawText": "text from CV", "jobDescription": "JD text" }
Response:

{
  "matchPercentage": 75,
  "matchedSkills": ["Marketing", "Sales", "Leadership"],
  "missingSkills": ["Python", "AWS"]
}

Project Structure
cv-ats-system/
│
├─ backend/
│  ├─ controllers/
│  │  └─ cv.controller.js
│  ├─ services/
│  │  ├─ aiparser.service.js
│  │  ├─ ats.service.js
│  │  ├─ jdMatch.service.js
│  │  └─ ocrParser.service.js
│  ├─ uploads/
│  │  ├─ cv/
│  │  └─ excel/
│  ├─ routes/
│  │  └─ cv.routes.js
│  └─ server.js
│
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  └─ UploadCV.jsx
│  │  ├─ api.js
│  │  └─ App.jsx
│  └─ package.json
│
└─ screenshots/
    ├─ upload-cv.png
    ├─ parsed-cv.png
    └─ jd-match.png

Troubleshooting

CV upload fails: Ensure backend is running on http://localhost:5000

JD Match returns 0: Upload CV first; ensure JD contains relevant keywords

Loading animation not showing: Check loadingCV and loadingJD states in App.jsx

Future Enhancements

Multi-language CV parsing

Real-time ATS suggestions while editing CV

User accounts to save CV history

Improved AI parsing for complex CV layouts

License

MIT License © 2025 Sandeep992299


---

✅ **Next Steps for GitHub:**

1. Save this as `README.md` in your project root.
2. Make a `screenshots/` folder and add your images.
3. Commit and push to GitHub:

```bash
git add README.md screenshots/
git commit -m "Add detailed README with screenshots"
git push origin main
