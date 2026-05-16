import { Router } from "express";
import { body, Result, validationResult, } from "express-validator";
import bcrypt from "bcrypt";
import jwt, {} from "jsonwebtoken";
import { User } from "../models/User.js";
import { validateToken } from "../middleware/validateToken.js";
const router = Router();
// TEST ONLY — NEVER expose in production
router.delete("/:username", async (req, res) => {
    try {
        const result = await User.deleteOne({ username: req.params.username });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Test user deleted" });
    }
    catch {
        res.status(500).json({ message: "Delete failed" });
    }
});
//Registering
router.post("/register", body("username").trim().isLength({ min: 3 }).escape(), body("password").isLength({ min: 3 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const existingUser = await User.findOne({
            username: req.body.username,
        });
        if (existingUser) {
            console.log("User already in use", existingUser);
            return res.status(409).json({ username: "username already in use" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await User.create({
            username: req.body.username,
            password: hash,
        });
        return res.status(200).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(`Error during registration: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
// Login
router.post("/login", body("username").trim().escape(), body("password").escape(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        //console.log(user)
        if (!user) {
            return res.status(403).json({ message: "Login failed" });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const jwtPayload = {
                id: user._id,
                username: user.username,
            };
            const token = jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: "1h" });
            return res.status(200).json({ success: true, token });
        }
        return res.status(401).json({ message: "Login failed" });
    }
    catch (error) {
        console.log(`Error during login: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/list", validateToken, async (req, res) => {
    try {
        const listOfUsers = await User.find();
        return res.status(200).json(listOfUsers);
    }
    catch (error) {
        console.log("Erroe while trying to fetch users", error);
        return res
            .status(500)
            .json({ message: "Erroe while trying to fetch users" });
    }
});
export default router;
//# sourceMappingURL=user.js.map