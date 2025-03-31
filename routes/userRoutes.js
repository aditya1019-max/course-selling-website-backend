const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const Course = require("../models/Course"); // Import Course model

// User Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password, purchasedCourses: [] });
  await user.save();
  res.json({ message: "User created successfully" });
});

// Get All Courses (for browsing)
router.get("/courses", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  const courses = await Course.find({});
  res.json({ courses });
});

// Purchase a Course
router.post("/courses/:courseId", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  const course = await Course.findById(req.params.courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  user.purchasedCourses.push(course);
  await user.save();
  res.json({ message: "Course purchased successfully" });
});

// Get Purchased Courses
router.get("/purchasedCourses", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  res.json({ purchasedCourses: user.purchasedCourses });
});

module.exports = router;