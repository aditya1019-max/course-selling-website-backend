// Admin.js

const mongoose = require("mongoose");

// Define Admin Schema
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create Admin Model
const Admin = mongoose.model("Admin", AdminSchema);  //the first Admin in this line is used to store the value of mongoose.model("Admin", AdminSchema); which will be store in db as prular form(admins) and second Addmin is used for using it in code for exposrt modules 

// Export the model
module.exports = Admin;