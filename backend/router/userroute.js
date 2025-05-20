const express = require("express");
const { RegisterUser, loginUser, userProfile, updateUserProfile, forgetPassword, verifyCode, resetPassword, userContact } = require("../controllers/usercontrol");
const upload = require("../utilite/multer");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/register", RegisterUser)
router.post("/login", loginUser)

router.post("/forget-password", forgetPassword)
router.post("/verify-code", verifyCode)
router.post("/reset-password", resetPassword)

router.get("/profile",isAuthenticated, userProfile)
router.put("/profile",isAuthenticated, upload.single("profile"), updateUserProfile)

router.post("/contact", userContact)

module.exports = router