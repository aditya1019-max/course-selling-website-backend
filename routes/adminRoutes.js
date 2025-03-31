const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin"); // Import Admin model
const Course = require("../models/Course"); // Import Course model

// Admin Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = new Admin({ username, password });
  await admin.save();
  res.json({ message: "Admin created successfully" });
});

// Create a Course
router.post("/courses", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(403).json({ message: "Unauthorized" });

  const { title, description, price, imageLink } = req.body;
  const course = new Course({ title, description, price, imageLink });
  await course.save();
  res.json({ message: "Course created successfully", courseId: course._id });
});

// Get All Courses
router.get("/courses", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(403).json({ message: "Unauthorized" });

  const courses = await Course.find({});
  res.json({ courses });
});

module.exports = router;