import multer, { type StorageEngine, type Multer } from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Recreate __dirname and __filename for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define uploads path (one level up from dist/)
const uploadPath = path.join(__dirname, "../../uploads");

// Create folder if it doesn’t exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Created uploads folder at:", uploadPath);
}

// Configure storage
const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads")); //one level up from dist/
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Optional: filter by file type
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

//const upload: Multer = multer({ storage: storage });

// Create the upload middleware
const upload = multer({ storage, fileFilter });

export default upload;
