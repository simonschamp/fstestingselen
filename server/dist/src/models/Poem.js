import mongoose, { Document, Schema } from "mongoose";
let poemSchema = new Schema({
    poem: { type: String, required: true },
    vip: { type: Boolean, required: true },
    date: { type: Date, required: true },
});
const Poem = mongoose.model("Poem", poemSchema);
export { Poem };
//# sourceMappingURL=Poem.js.map