const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Multer storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: "Education",
        format: file.mimetype.split("/")[1], // extract format from mimetype
        public_id: Date.now() + "-" + file.originalname.split('.')[0], // clean public_id
        resource_type: "video", // ✅ CORRECT placement outside of "params"
    }),
});

// File size and type validation
const upload = multer({ storage });

module.exports = upload;



