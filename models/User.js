// User.js

const mongoose = require("mongoose");
const Course = require("./Course"); // Import Course model to access Course.schema

// Define user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  purchasedCourses: [Course.schema], // Use Course.schema to reference the embedded schema
});

// Create user model
const User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;