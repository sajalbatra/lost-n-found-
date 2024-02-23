import upload from "../middlewares/upload.middle.js";
import multer from "multer";
export async function handleImageUpload(req, res) {
    try {
        upload.single("file")(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(500).json({ error: err.message });
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(500).json({ error: "An unknown error occurred." });
            }
            
            if (!req.file) {
                return res.status(400).json({ error: "You must select a file." });
            }

            const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
            return res.status(200).json({ imgUrl: imgUrl });
        });
    } catch (error) {
        console.error("Error in handling image upload:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
