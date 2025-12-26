const Issue = require("../models/Issue");

const createIssue = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // ✅ FIX: Parse location string
    const location = JSON.parse(req.body.location);

    const issue = await Issue.create({
      title,
      description,
      category,
      location,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      reportedBy: req.user.id,
    });

    res.status(201).json({
      message: "Issue reported successfully",
      issue,
    });
  } catch (error) {
    console.error("CREATE ISSUE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};




const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: issues.length,
      issues,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: issues.length,
      issues,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateIssueStatus = async (req, res) => {
  try {
    console.log("ADMIN USER:", req.user);
    console.log("ISSUE ID:", req.params.id);
    console.log("STATUS BODY:", req.body);

    const { status } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = status;
    await issue.save();

    res.status(200).json({
      message: "Issue status updated successfully",
      issue,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  createIssue,
  getAllIssues,
  getMyIssues,
  updateIssueStatus,
};

