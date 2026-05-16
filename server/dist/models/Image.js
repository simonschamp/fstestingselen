import mongoose, { Document, Schema } from "mongoose";
const imageSchema = new Schema({
    filename: { type: String, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Image = mongoose.model("Image", imageSchema);
export { Image };
//# sourceMappingURL=Image.js.map