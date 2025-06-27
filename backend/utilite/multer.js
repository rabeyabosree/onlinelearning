const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utilite/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const format = file.mimetype.split("/")[1]; // e.g., 'mp4'
        return {
            folder: "E-Learning",
            format: format,
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
            resource_type: "auto", // <-- ✅ safer than 'video'
        };
    }

});

const upload = multer({
    storage
});

module.exports = upload;




