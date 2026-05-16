import mongoose from "mongoose";
export interface IMessage extends mongoose.Document {
    title: string;
    content: string;
    createdAt: Date;
    order: number;
}
declare const _default: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, {}> & IMessage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Message.d.ts.map