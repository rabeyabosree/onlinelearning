const express = require("express");
const { addReviews, getReviews } = require("../controllers/reviewsControl");
const router = express.Router();

router.post("/:courseId", addReviews)
router.get("/:courseId", getReviews)

module.exports = router