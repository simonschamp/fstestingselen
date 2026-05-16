//server.ts
import express, {} from "express";
import path from "path";
import router from "./src/routes/app.js"; //must include .js for ESM
import userRouter from "./src/routes/user.js";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = parseInt(process.env.PORT) || 8000;
//const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoDB = "mongodb://127.0.0.1:27017/FullStackPracDB";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => console.log("MongoDB connected successfully"));
// Enable CORS for all origins (development)
app.use(cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true, // for allowing cookies
}));
// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
// Serve static files, works in ESM mode
app.use(express.static(path.join(__dirname, "../public")));
//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// Routes
app.use("/", router);
app.use("/user", userRouter);
app.listen(port, () => {
    console.log(`Server running on http://localhost: ${port}`);
});
//# sourceMappingURL=server.js.map