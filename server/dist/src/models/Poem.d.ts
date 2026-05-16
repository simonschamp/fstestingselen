import mongoose, { Document } from "mongoose";
interface IPoem extends Document {
    poem: string;
    vip: boolean;
    date: Date;
}
declare const Poem: mongoose.Model<IPoem>;
export { Poem };
export type { IPoem };
//# sourceMappingURL=Poem.d.ts.map