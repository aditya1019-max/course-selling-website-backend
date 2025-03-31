const express = require("express"); // Import Express library
const connectDB = require("./config/connectDB"); // Import database connection logic
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes
const userRoutes = require("./routes/userRoutes"); // Import user routes

const app = express(); // Create an Express app instance

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Define Routes
app.use("/admin", adminRoutes); // All admin-related routes prefixed with /admin
app.use("/users", userRoutes); // All user-related routes prefixed with /users

// Start the server
const PORT = 3000; // Define the port number
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});