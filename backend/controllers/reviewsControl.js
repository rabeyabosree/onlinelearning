const Courses = require("../models/couresmodel");
const Reviews = require("../models/reviewsModel");


const addReviews = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { studentId, rating, reviews } = req.body;

        const review = new Reviews({
            courseId,
            studentId,
            rating,
            reviews
        })

        await review.save();

        const reviewsLength = await Reviews.find({ courseId });
        const avgRating = reviewsLength.reduce((avg, review) => {
            avg + review, 0
        }) / reviewsLength.length;

        await Courses.findByIdAndUpdate(courseId, { avgRating });
        res.status(200).json(review)

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }

}

const getReviews = async (req, res) => {
    try {
        const { courseId } = req.params;
        const reviews = await Reviews.find({ courseId });
        if (reviews.length === 0) {
            return res.status(404).json({ message: "no reviwes found" })
        }

        res.status(200).json(reviews)

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }

}

module.exports = { addReviews, getReviews }