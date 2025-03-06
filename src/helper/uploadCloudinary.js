const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image.jfif"
    ) {
        cb(null, true);
        req.isFileValid = true;
    } else {
        req.isFileValid = false;
        req.isFileValidMessage =
            "Files must be jpg, jpeg, png, and jfif, and should not exceed 5MB in size.";
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
