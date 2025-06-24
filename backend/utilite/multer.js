const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "Education",
            format: file.mimetype.split("/")[1], // video/mp4 => 'mp4'
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
            resource_type: "video", // ✅ Required for Cloudinary to treat it as a video
        };
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error("Only video files are allowed!"));
        }
    },
    limits: { fileSize: 500 * 1024 * 1024 }, // optional: 500MB limit
});

module.exports = upload;




