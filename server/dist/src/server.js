//server.ts
import express, {} from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js"; //must include .js for ESM
import cors from "cors";
import mongoose, { Connection } from "mongoose";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;
const mongoDB = "mongodb://127.0.0.1:27017/poemdb_practice";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
// Enable CORS for all origins (development)
app.use(cors());
// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
// Serve static files, works in ESM mode
app.use(express.static(path.join(__dirname, "../public")));
// Routes
app.use("/", router);
app.listen(port, () => {
    console.log(`Server running on http://localhost: ${port}`);
});
//# sourceMappingURL=server.js.map