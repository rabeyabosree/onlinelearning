const express = require("express");
const upload = require("../utilite/multer");
const { createQuiz, getcourses, getAllUsers, addcourses, getcourseById, updatecourses, deletecourses } = require("../controllers/adminController");


const router = express.Router();

// Course-related routes
router.post('/add', upload.single('videoUrl'), addcourses);
router.get("/courses", getcourses);
router.get("/courses/:courseId", getcourseById);
router.put("/update/:id", updatecourses);
router.delete("/delete/:id", deletecourses);

//quiz route 
router.post("/quiz", createQuiz);

// User-related route
router.get("/users", getAllUsers);  // Assuming you want to get all users

module.exports = router;
