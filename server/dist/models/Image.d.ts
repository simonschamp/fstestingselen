import mongoose, { Document } from "mongoose";
interface IImage extends Document {
    filename: string;
    description: string;
    path: string;
    createdAt: Date;
    id?: string;
}
declare const Image: mongoose.Model<IImage>;
export { Image, type IImage };
//# sourceMappingURL=Image.d.ts.map