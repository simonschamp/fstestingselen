import { Router } from "express";
import { compile } from "morgan";
import { Poem } from "../models/Poem";
import populatePoems from "../../data/poems";
const router = Router();
//Api end-point to gett all poems
router.get("/", (_req, res) => {
    //res.json(poems);
});
//Api end-point to get 1 poem
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); // the ! asserts it is not undefined
});
router.post("/:id", (req, res) => {
    let poem = req.body;
    console.log(poem);
});
router.get("/api/poems/populate", async (req, res) => {
    for (let i = 0; i < populatePoems.length; i++) {
        const poem = new Poem({
            poem: populatePoems[i].poem,
            vip: false,
            date: new Date(),
        });
        await poem.save();
    }
    console.log("Database populated");
    res.json({ message: "Database populated" });
});
export default router;
//# sourceMappingURL=index.js.map