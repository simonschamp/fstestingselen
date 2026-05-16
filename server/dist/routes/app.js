import { Router } from "express";
import { compile } from "morgan";
import { Image } from "../models/Image.js";
import upload from "../middleware/multer-config.js";
import path from "path";
import { validateToken } from "../middleware/validateToken.js";
const router = Router();
// Get all uploaded images
router.get("/api/images", async (req, res) => {
    try {
        const images = await Image.find();
        if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found" });
        }
        res.status(200).json(images);
        console.log("Images fetched successfully from the database");
    }
    catch (error) {
        console.error(`Error while fetching a images: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// Get one image by ID
router.get("/api/images/:id", async (req, res) => {
    const oneImg = req.params.id;
    try {
        const image = await Image.findById(oneImg);
        if (!image) {
            return res.status(404).json({ message: "Image does not exist" });
        }
        res.status(200).json(image);
        console.log(image);
        console.log("Image fetched successfully from database", image);
    }
    catch (error) {
        console.error(`Error while fetching a file: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// Update an image description
router.patch("/api/images/:id", async (req, res) => {
    const oneImg = req.params.id;
    try {
        const image = await Image.findById(oneImg);
        if (!image) {
            return res.status(404).json({ message: "Image does not exist" });
        }
        image.description = req.body.description || image.description;
        await image.save();
        res.status(200).json({ message: "Image updated successfully" });
        console.log("Image updated", image);
    }
    catch (error) {
        console.error(`Error while updating a file: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// Handle file uploads
router.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const image = new Image({
            filename: req.file.filename,
            description: req.body.description,
            path: `/uploads/${req.file.filename}`,
        });
        await image.save();
        console.log("File uploaded and saved in the database");
        return res
            .status(201)
            .json({ message: "File uploaded and saved in the database" });
    }
    catch (error) {
        console.error(`Error while uploading file: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/api/poems", validateToken, async (req, res) => {
    try {
        const poems = [
            {
                id: 1,
                poem: "Nunc tempus eros id venenatis sagittis. Nam ac sagittis elit. Aenean ac eleifend metus, eget tincidunt odio.",
                vip: true,
            },
            {
                id: 2,
                poem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit libero sed mi euismod dapibus. Nullam eu molestie libero, eget interdum massa.",
                vip: false,
            },
            {
                id: 3,
                poem: "Suspendisse efficitur tellus id blandit vestibulum. Etiam condimentum dolor velit, in fermentum ligula ultricies et.",
                vip: false,
            },
        ];
        res.status(200).json(poems);
    }
    catch (error) {
        console.error(`Error during poem retrieval: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;
//# sourceMappingURL=app.js.map