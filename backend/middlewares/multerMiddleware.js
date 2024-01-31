import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Invalid image file.", false);
    }
}

const upload = multer({ storage, fileFilter })

export default upload;