const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
    analyzeResume,
    getAnalysisHistory,
    getAnalysisById,
} = require("../controllers/resumeController");

router.post(
    "/analyze",
    upload.single("resume"),
    analyzeResume
);

router.get(
    "/history",
    getAnalysisHistory
);

router.get(
    "/history/:id",
    getAnalysisById
);

module.exports = router;