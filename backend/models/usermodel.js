const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    profile: { type: String },
    bio: { type: String },
    resetPasswordCode: { type: String },
    resetCodeExpires: { type: Date },
    enrolledCourses: [{
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
        progress: { type: Number, default: 0 },
        status: { type: String, enum: ["enrolled", "in-progress", "completed"], default: " enrolled" },
    }],
    certificates: { type: String }
})

const User = mongoose.model("User", userSchema);
module.exports = User;