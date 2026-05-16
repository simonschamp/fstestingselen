//server.ts
import express, {} from "express";
import path from "path";
import router from "./routes/app.js"; //must include .js for ESM
import userRouter from "./routes/user.js";
import messagesRouter from "./routes/messages.js";
//import testRouter from "./routes/test.js"; // NEW
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
//const port: number = parseInt(process.env.PORT as string) || 8001;
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
// ---- MongoDB ----
const mongoDB = process.env.MONGO_URI;
if (!mongoDB) {
    console.log("MongoDB connection error");
    throw new Error("MONGO_URI not defined");
}
else {
    await mongoose.connect(mongoDB);
    console.log("MongoDB connected successfully");
}
// ---- Middleware ----
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
// ---- Routes ----
app.use("/", router);
app.use("/user", userRouter);
app.use("/api/messages", messagesRouter);
//Test only route
/*if (process.env.NODE_ENV === "test") {
  app.use("/api/test", testRouter);
}*/
app.listen(port, () => {
    console.log(`Server running on http://localhost: ${port}`);
});
//# sourceMappingURL=server.js.map