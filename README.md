# CV ATS System

![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![React](https://img.shields.io/badge/React-v18-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Overview
The **CV ATS System** is a web-based application designed to help job seekers, recruiters, and HR professionals optimize CVs for Applicant Tracking Systems (ATS).  

**Key Features:**
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

### Upload CV Interface
![Upload CV Screenshot](.\backend\uploads\cv\images\1.png)

### Parsed CV Data 
![Parsed CV Screenshot](.\backend\uploads\cv\images\2.png)

### Skills and Certification Match
![JD Match Screenshot](.\backend\uploads\cv\images\3.png)

### ATS Score and Job Description Match
![JD Match Screenshot](.\backend\uploads\cv\images\4.png)

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

---

### 1. Clone the Repository
git clone https://github.com/Sandeep992299/cv-ats-system.git
cd cv-ats-system

text

### 2. Install Dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

text

### 3. Start Backend
cd backend
node server.js

text
Backend runs on http://localhost:5000

### 4. Start Frontend
cd frontend
npm start

text
Frontend runs on http://localhost:3000

## Usage

### Upload CV
1. Click **Drag & Drop CV** or select a file.
2. Supported formats: **PDF, DOCX**.
3. CV is parsed and ATS score is displayed.
4. Multiple phone numbers are separated automatically.
5. Loading animation shows processing progress.

### View Parsed Data
- **Basic Info:** Name, Email, Phone
- **Education, Experience, Projects, Skills, Certifications**
- **Highlights:** Strong points detected
- **Needs Improvement:** Suggestions for ATS improvement
- **ATS Score:** Out of 100

### Match Job Description
1. Paste JD into the textarea.
2. Click **Match Job Description**.
3. JD Match Score appears after processing.
4. Loading animation shows progress.

## API Endpoints

### 1. Upload CV
**POST** `/api/cv/upload`  
Form data: `file`  
Response:
{
"parsedData": { ... },
"uploadedCV": "filename.pdf",
"excelFile": "Candidate_parsed.xlsx",
"rawText": "Full text extracted from CV"
}

text

### 2. Check ATS
**POST** `/api/cv/ats`  
Body: `{ "rawText": "text from CV" }`  
Response:
{
"score": 60,
"issues": ["Add measurable achievements, tools, certifications, and role-specific keywords"]
}

text

### 3. Match Job Description
**POST** `/api/cv/match-jd`  
Body: `{ "rawText": "text from CV", "jobDescription": "JD text" }`  
Response:
{
"matchPercentage": 75,
"matchedSkills": ["Marketing", "Sales", "Leadership"],
"missingSkills": ["Python", "AWS"]
}

text

## Project Structure
cv-ats-system/
│
├─ backend/
│ ├─ controllers/
│ │ └─ cv.controller.js
│ ├─ services/
│ │ ├─ aiparser.service.js
│ │ ├─ ats.service.js
│ │ ├─ jdMatch.service.js
│ │ └─ ocrParser.service.js
│ ├─ uploads/
│ │ ├─ cv/
│ │ └─ excel/
│ ├─ routes/
│ │ └─ cv.routes.js
│ └─ server.js
│
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ │ └─ UploadCV.jsx
│ │ ├─ api.js
│ │ └─ App.jsx
│ └─ package.json
│
└─ screenshots/
├─ upload-cv.png
├─ parsed-cv.png
└─ jd-match.png

text

## Troubleshooting
- **CV upload fails:** Ensure backend is running on http://localhost:5000
- **JD Match returns 0:** Upload CV first; ensure JD contains relevant keywords
- **Loading animation not showing:** Check loadingCV and loadingJD states in App.jsx
- **Phone numbers combined:** Make sure regex `\+?\d[\d\s]{6,}/g` correctly matches numbers in App.jsx

## Future Enhancements
- Multi-language CV parsing
- Real-time ATS suggestions while editing CV
- User accounts to save CV history
- Improved AI parsing for complex CV layouts
- Integration with LinkedIn for auto-import of CV data

## License
MIT License © 2025 Sandeep992299