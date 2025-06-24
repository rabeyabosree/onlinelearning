const User = require('../models/usermodel');
const Courses = require("../models/couresmodel");
const Notification = require("../models/notification");
const mongoose = require("mongoose");
const Quiz = require('../models/quizemodel');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }


        res.status(200).json({
            message: "Users fetched successfully",
            users: users
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ // Use 500 for internal server errors
            message: "Server error: Unable to fetch users",
            error: error.message
        });
    }
};

const addcourses = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded.' });
        }

        console.log("Cloudinary file info:", req.file);

        const { title, description, instructor, duration, price, category } = req.body;
        const videoUrl = req.file.path; // ✅ Cloudinary URL

        const newCourse = {
            title,
            description,
            instructor,
            duration,
            price,
            category,
            videoUrl,
        };

        const course = await Courses.create(newCourse); // ✅ Already saves, no need for course.save()

        res.status(201).json(course); // Better practice: 201 Created
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getcourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        

        res.status(200).json({ message: "Courses retrieved successfully", data: courses });  // Detailed success response
    } catch (error) {
        console.error('Error fetching courses:', error);  // More detailed error logging
        res.status(500).json({ message: "Failed to retrieve courses", error: error.message });  // Return error message in the response
    }
};

const getcourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
      

        // Validate that the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid course ID format" });
        }

        // Find the course by its ID
        const course = await Courses.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Return the course data
        res.json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updatecourses = async (req, res) => {
    try {
        const { title, description, instructor, duration, price } = req.body;
        const { id } = req.params;

        const updatedCourse = { title, description, instructor, duration, price };

        const course = await Courses.findByIdAndUpdate(id, updatedCourse, { new: true });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        return res.json(course);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const deletecourses = async (req, res) => {
    try {
        const { id } = req.params;  // Get id directly from params
        console.log(id)
        const course = await Courses.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"  // Adjust the message to reflect correct info
            });
        }
        console.log("delete successfully")
        res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
};

const createQuiz = async (req, res) => {
    try {
        const { courseId, questions } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "At least one question is required" });
        }

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (
                !q.questionText ||
                !Array.isArray(q.options) ||
                q.options.length !== 4 ||
                !q.correctAnswer
            ) {
                return res.status(400).json({ message: `Invalid data in question ${i + 1}` });
            }
        }
        
        const quiz = await Quiz.create({ courseId, questions });
        res.status(201).json(quiz);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};




module.exports = { addcourses, getcourses, updatecourses, deletecourses, getcourseById, getAllUsers, createQuiz };

