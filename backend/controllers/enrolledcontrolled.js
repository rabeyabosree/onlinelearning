const mongoose = require('mongoose');
const Enrolled = require('../models/enrolledmodel'); // Assuming you have this model
const Courses = require('../models/couresmodel');
const User = require('../models/usermodel');

const enrolledCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Validate courseId and userId
        if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid course or user ID" });
        }

        // Check if the course exists
        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is already enrolled in this course
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // Enroll the user in the course by adding the course to the user's enrolledCourses array
        user.enrolledCourses.push(courseId);
        await user.save();

        // Optionally, create an Enrolled record to track the enrollment
        const enrollment = new Enrolled({
            user: userId,
            course: courseId,
            enrollmentDate: new Date()
        });
        await enrollment.save();

        // Respond with success and return the updated list of courses
        const updatedUser = await User.findById(userId).populate('enrolledCourses');
        res.json({
            message: "Enrolled in the course successfully",
            enrolledCourses: updatedUser.enrolledCourses
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
};

const getEnrolledCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Find the user by their ID and populate the enrolledCourses field
        const user = await User.findOne({ _id: userId }).populate('enrolledCourses.course');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is enrolled in the specific course
        const enrolledCourse = user.enrolledCourses.find(course => course.course._id.toString() === courseId);

        if (enrolledCourse) {
            return res.status(200).json({
                message: "User is enrolled in this course",
                course: enrolledCourse.course, 
                progress: enrolledCourse.progress,
                status: enrolledCourse.status
            });
        } else {
            return res.status(404).json({ message: "User is not enrolled in this course" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
};


module.exports = { enrolledCourse, getEnrolledCourse }