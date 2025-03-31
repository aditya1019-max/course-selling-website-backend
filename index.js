const express = require("express");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const app = express();
app.use(express.json());


const uri = "mongodb+srv://raut2813:q4jY50c87aqKNCCV@cluster0.yq6af.mongodb.net/";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

connectDB();



// Models
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [CourseSchema],
});



const Admin = mongoose.model("Admin", AdminSchema);
const Course = mongoose.model("Course", CourseSchema);
const User = mongoose.model("User", UserSchema);


// Routes

// Admin Routes
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = new Admin({ username, password });
  await admin.save();
  res.json({ message: "Admin created successfully" });
});

app.post("./admin/signup", async(req, res) => {
  const {username, password} = req.body;
  const admin = new Admin({username, password});
  await admin.save();
  res.json({message: "Admin created succesfully"});
})

app.post("/admin/courses", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(403).json({ message: "Unauthorized" });
  else{
  const { title, description, price, imageLink } = req.body;
  const course = new Course({ title, description, price, imageLink });
  await course.save();
  res.json({ message: "Course created successfully", courseId: course._id });
  }
});

app.get("/admin/courses", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(403).json({ message: "Unauthorized" });
  
  const courses = await Course.find({});
  res.json({ courses });
});

app.get("/admin/courses", async(req,res) => {
  const {username, password} = req.headers;
  const admin= await Admin.findOne({ username, password});
  if (!admin) return res.status(403).json({message: "Unauthorized"});
})

// User Routes
app.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password, purchasedCourses: [] });
  await user.save();
  res.json({ message: "User created successfully" });
  res.send("hello");
});

app.get("/users/courses", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  const courses = await Course.find({});
  res.json({ courses });
});

app.post("/users/courses/:courseId", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  const course = await Course.findById(req.params.courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  user.purchasedCourses.push(course);
  await user.save();
  res.json({ message: "Course purchased successfully" });
});

app.get("/users/purchasedCourses", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(403).json({ message: "Unauthorized" });

  res.json({ purchasedCourses: user.purchasedCourses });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});