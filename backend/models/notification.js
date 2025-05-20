const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    message: { type: String },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
});

const Notifation = mongoose.model("Notification", notificationSchema);
module.exports = Notifation;