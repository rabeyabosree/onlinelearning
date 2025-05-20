const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const { enrolledCourse, getEnrolledCourse } = require("../controllers/enrolledcontrolled");
const { updateCoursesProgress, certification } = require("../controllers/studentcontroller");
const { getuserNotification, putNotification } = require("../controllers/notificationController");
const { getQuizs, getQuiz, submitquiz } = require("../controllers/quizemodel");



const router = express.Router();

router.post("/enroll", isAuthenticated, enrolledCourse)
router.post("/quizes", isAuthenticated, enrolledCourse)
router.get("/enrolled", isAuthenticated, getEnrolledCourse)
router.get("/quizes/:courseId", getQuizs)
router.get("/quizes/:id", getQuiz)
router.post("/quizes/submit",submitquiz)
router.put("/progress", isAuthenticated, updateCoursesProgress)
router.post("/certificate", isAuthenticated, certification)
router.get("/notifications", isAuthenticated, getuserNotification)
router.put("/:id", isAuthenticated, putNotification)

module.exports = router 