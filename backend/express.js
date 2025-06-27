const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();  // Corrected dotenv configuration
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL || "";

const app = express();
// main server file (server.js or app.js) এ এইটা যোগ করো
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));


app.use(cors({
    origin: "http://localhost:5173",  // You can specify your front-end URL here
    credentials: true
}));

const userRoute = require('./router/userroute');
const reviewsRoute = require('./router/reviewsRoute');
const studentRoute = require('./router/studentRoute');
const adminRoute = require('./router/adminRoute');

app.use("/api/auth", userRoute)
app.use("/api/reviews", reviewsRoute)
app.use("/api/admin", adminRoute)
app.use("/api/student", studentRoute)

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
    res.send("200 OK");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});






