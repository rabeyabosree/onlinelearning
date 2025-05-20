const mongoose = require("mongoose");

const reviewShema = new mongoose.Schema({
    courseId: {type: mongoose.Types.ObjectId , ref: "Courses" , required: true},
    studentid: {type: mongoose.Types.ObjectId , ref :"User" , required:  true},
    rating: {type: Number , min: 1, max: 5},
    review: {type: String , required: true}
},
{timestamps: true});


const Reviews = mongoose.model("Reviews" , reviewShema);
module.exports = Reviews;