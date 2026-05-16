export {};
/*import { Router } from "express";
import { User } from "../models/User.js";

const router = Router();

// TEST ONLY — NEVER expose in production

router.delete("/:username", async (req, res) => {
  const { username } = req.params;

  const result = await User.deleteOne({ username });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Test user deleted" });
});

export default router;
*/
//# sourceMappingURL=test.js.map