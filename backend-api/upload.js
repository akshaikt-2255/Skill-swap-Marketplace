const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images/')
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname)) 
    // Generate a unique file name with the original extension.
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
