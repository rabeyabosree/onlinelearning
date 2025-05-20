const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructor: String,
    duration: String,
    category: String,
    price: String,
    videoUrl: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},{timestamps: true})

const Courses = mongoose.model("Courses", courseSchema);
module.exports = Courses


/**
 * const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructor: String,
    duration: String,
    price: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

 const Courses = ("Courses", courseSchema);
module.exports = Courses
 */