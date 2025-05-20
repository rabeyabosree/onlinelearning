const mongoose = require('mongoose');

const enrolledSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    courseId: { type: mongoose.Types.ObjectId, ref: "Courses", required: true },
    enrollmentDate: { type: Date, default: Date.now() }
})

const Enrolled = ("Enrolled", enrolledSchema);
module.exports = Enrolled;