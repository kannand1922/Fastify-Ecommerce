const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

// Initialize Express
const app = express();
const PORT = 4003;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "kannan", // Your Cloudinary cloud name
  api_key: "159394547943683", // Your Cloudinary API key
  api_secret: "c6MCS9tt0r6r9bwHlZaHbEL1AbE", // Your Cloudinary API secret
});

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the upload route
app.post("/upload", async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Automatically determine the resource type
        public_id: `uploads/${Date.now()}_${req.file.originalname}`, // Set a unique public ID
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).send("Error uploading file to Cloudinary.");
        }
        // Return the Cloudinary URL
        res.send({
          message: "File uploaded successfully!",
          url: result.secure_url, // The URL of the uploaded file
        });
      }
    );

    // Pipe the file buffer to Cloudinary
    // const stream = cloudinary.uploader.upload_stream();
    // stream.end(req.file.buffer); // Send the file buffer to Cloudinary
  } catch (error) {
    console.error("Error during upload process:", error);
    res.status(500).send("Error during upload process.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
