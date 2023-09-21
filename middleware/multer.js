const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    let result = file.originalname.split(' ').join('');
    cb(null, path.basename(result, ext) + Date.now() + ext);
  },
});
exports.upload = multer({ storage: storage });
