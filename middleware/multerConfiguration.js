const multer = require('multer');
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/assets'); // Set your upload directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename uploaded file with timestamp
  },
});

const upload = multer({ storage });

module.exports = { upload };