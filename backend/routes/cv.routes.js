const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const controller = require("../controllers/cv.controller");

const router = express.Router();

const uploadFolder = path.join(__dirname, "../uploads/cv");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Routes
// Upload CV route
router.post("/upload", upload.single("file"), controller.uploadCV);
router.post("/ats", controller.checkATS);
router.post("/match-jd", controller.matchJD);

module.exports = router;
