import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import 'dotenv/config';

// Configure multer storage engine with GridFSStorage
const storage = new GridFsStorage({
    url: process.env.MONGOURL,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

// Initialize multer with the configured storage engine
const upload = multer({ storage: storage });

export default upload;
