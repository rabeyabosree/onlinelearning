const express = require('express');
const { enrolledCourse, enrolledStudent } = require('../controllers/enrolledcontrolled');
const router = express.Router();

router.post("/enroll", enrolledCourse);
router.get("/", enrolledStudent);

module.exports = router;