const mongoose = require("mongoose");

// MongoDB URI
const uri = "mongodb+srv://raut2813:q4jY50c87aqKNCCV@cluster0.yq6af.mongodb.net/";

// Function to connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
}

// Export the function to use in other files
module.exports = connectDB;