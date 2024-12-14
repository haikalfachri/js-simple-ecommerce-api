const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ensureDirectoryExistence = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Folder in request body:", req.body.folder); // Debugging
        const folder = req.folder || "other";
        const directory = path.join(__dirname, `../public/asset/${folder}`);
        ensureDirectoryExistence(directory);
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("only image files are allowed!"), false);
    }
};

const uploadMiddleware = multer({ storage, fileFilter });

module.exports = { uploadMiddleware };
