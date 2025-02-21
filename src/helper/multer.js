const multer = require("multer");
const path = require("path");

// multer storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // supported image formats
    const supportedImageExtension = /(json|csv)/;
    const fileExtension = path.extname(file.originalname);
    if (supportedImageExtension.test(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error("Only JSON/CSV file accepted"));
    }
  },
}).single("file");

// export brand multer
module.exports = fileUpload;
