const Notifation = require("../models/notification")

const putNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const isReaded = await Notifation.findByIdAndUpdate(id, { isRead: true });
        res.json({ success: true, message: "notification mark as read" })

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }

}

const getuserNotification = async (req, res) => {
    try {
        const notifications = await Notifation.find({ userId: req.user.userId }).sort({ createdAt: -1 })
        res.json({ success: true, notifications })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }

}

module.exports = { putNotification, getuserNotification }