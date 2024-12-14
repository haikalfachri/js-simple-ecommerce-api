const fs = require("fs");

const ensureDirectoryExistence = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.body.folder || "other";
        const directory = path.join(__dirname, `../public/asset/${folder}`);
        ensureDirectoryExistence(directory);
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
});

