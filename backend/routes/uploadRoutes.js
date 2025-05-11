const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");


require("dotenv").config();
const router = express.Router();
// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // function to handle the upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(result);
          }
        });
        // Use streamifier to create a stream from the buffer
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // call the streamUpload function to upload the file
    const result = await streamUpload(req.file.buffer);
    // if upload is successful, return the result with the uploaded image URL
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
});
module.exports = router;