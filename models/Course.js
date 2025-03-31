// course.js

const mongoose = require("mongoose");

// Define course schema
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageLink: { type: String, required: true },
});

// Create course model
const Course = mongoose.model("Course", CourseSchema);

// Export the model
module.exports = Course;