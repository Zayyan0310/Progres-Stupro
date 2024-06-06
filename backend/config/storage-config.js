const multer = require("multer");
const path = require("path");
const util = require("util");
const { nanoid } = require("nanoid");

// Configure Multer for file uploads to local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/user_profile');  // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const id = nanoid(16);
    const ext = path.extname(file.originalname);
    cb(null, `${id}${ext}`);
  },
});

const multerConfig = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
}).single("file");

let processFileConfig = util.promisify(multerConfig);

module.exports = { multerConfig, processFileConfig };