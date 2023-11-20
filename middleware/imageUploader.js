const { upload } = require("./multerConfiguration"); // Adjust the path accordingly

const imageUploader = (req, res, next) => {
  // Use the upload function to handle file upload
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error uploading image' });
    }

    // If the upload is successful, append the public URL to the uploaded file
    req.uploadedFileUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    next(); // Pass control to the next middleware or route handler
  });
};

module.exports = imageUploader;
