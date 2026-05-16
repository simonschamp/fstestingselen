import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  title: string;
  content: string;
  createdAt: Date;
  order: number;
}

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
