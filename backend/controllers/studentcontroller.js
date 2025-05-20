const Courses = require('../models/couresmodel');
const User = require('../models/usermodel');
const puppeteer = require("puppeteer")

const getAllCoursess = async (req, res) => {
    try {
        const courses = await Courses.find();
        res.status(200).json({ message: "login success", courses })

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }

}

const updateCoursesProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId, progress } = req.body;

        if (progress < 0 || process < 100) {
            return res.status(400).json({ message: "course not completed" })
        }
        const user = await User.findOne(userId);
        const courseIndex = user.enrolledCourses.findIndex((course) => course.course.toString === courseId);
        if (courseIndex === -1) {
            return res.status(404).json({ message: "course not found" })
        }

        user.enrolledCourses[courseIndex].progress = progress;
        if (progress === 100) {
            user.enrolledCourses[courseIndex].status = "completed"
        }
        await user.save()
        res.status(200).json({ message: "course progress update successfully" })

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }

}

const certification = async (req, res) => {
    try {
        const { courseId, userId } = req.params;
        
        // Fetch user and course data
        const student = await User.findById(userId).populate("name");
        const course = await Courses.findById(courseId).populate("title");

        if (!student || !course) {
            return res.status(404).json({ message: "User or course not found" });
        }

        // Launch Puppeteer to generate the PDF
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // HTML content with dynamic data
        const htmlContent = `
            <html>
            <head>
                <style>
                    body {
                        text-align: center;
                        font-family: Arial;
                    }
                    .certificate {
                        border: 10px solid gold;
                        padding: 20px;
                        width: 80%;
                        margin: auto;
                        background: white;
                    }
                    .title {
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .student {
                        font-size: 22px;
                        text-decoration: underline;
                    }
                    .course {
                        font-size: 18px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="certificate">
                    <h1>Certificate of Completion</h1>
                    <p>This is to certify that</p>
                    <h2 class="student">${student.name}</h2>
                    <p>has successfully completed the course</p>
                    <h3 class="course">${course.title}</h3>
                    <p>Date: ${new Date().toDateString()}</p>
                    <p>Instructor Signature: _____</p>
                </div>
            </body>
            </html>
        `;

        // Set the content of the page
        await page.setContent(htmlContent);

        // Generate the PDF
        const pdfBuffer = await page.pdf({ format: "A4" });
        await browser.close();

        // Set the response headers to indicate a PDF file download
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="certificate-${student.name}-${course.title}.pdf"`
        });

        // Send the PDF buffer as the response
        res.status(200).send(pdfBuffer);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
};

module.exports = { getAllCoursess, updateCoursesProgress, certification }