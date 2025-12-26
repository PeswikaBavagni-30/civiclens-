const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createIssue,
  getAllIssues,
  getMyIssues,
  updateIssueStatus,
} = require("../controllers/issueController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Get all issues
router.get("/", getAllIssues);

// Get my issues (protected)
router.get("/my", protect, getMyIssues);

// Create new issue (protected)
router.post("/", protect, upload.single("image"), createIssue);

// Admin: update issue status
router.put("/:id/status", protect, adminOnly, updateIssueStatus);

module.exports = router;
