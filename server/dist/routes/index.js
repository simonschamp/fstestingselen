import { Router } from "express";
import { compile } from "morgan";
import { Image } from "../models/Image.js";
import upload from "../middleware/multer-config.js";
const router = Router();
router.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imgPath = `/images/${req.file.filename}`; // Proper public URL
        const image = new Image({
            filename: req.file.filename,
            description: req.body.description,
            path: imgPath,
        });
        await image.save();
        console.log("File uploaded and saved in the database");
        return res
            .status(201)
            .json({ message: "File uploaded and saved in the database" });
    }
    catch (error) {
        console.log(`Error while uploading file: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
//# sourceMappingURL=index.js.map