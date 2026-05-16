import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
    order: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.model("Message", MessageSchema);
//# sourceMappingURL=Message.js.map