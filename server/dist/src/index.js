import { Router } from "express";
import fs from "fs";
const router = Router();
let poems = [];
fs.readFile("data/poems.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        poems = JSON.parse(data);
    }
    catch (error) {
        console.error(`Error parsing JSON: ${error}`);
    }
});
router.get("/", (req, res) => {
    res.json(poems);
});
export default router;
//# sourceMappingURL=index.js.map