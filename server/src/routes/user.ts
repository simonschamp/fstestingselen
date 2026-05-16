import { type Request, type Response, Router } from "express";
import {
  body,
  Result,
  type ValidationError,
  validationResult,
} from "express-validator";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User, type IUser } from "../models/User.js";
import { validateToken } from "../middleware/validateToken.js";

const router: Router = Router();

// TEST ONLY — NEVER expose in production

router.delete("/:username", async (req, res) => {
  try {
    const result = await User.deleteOne({ username: req.params.username });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Test user deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

//Registering
router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }).escape(),
  body("password").isLength({ min: 3 }),
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const existingUser: IUser | null = await User.findOne({
        username: req.body.username,
      });

      if (existingUser) {
        console.log("User already in use", existingUser);
        return res.status(409).json({ username: "username already in use" });
      }
      const salt: string = bcrypt.genSaltSync(10);
      const hash: string = bcrypt.hashSync(req.body.password, salt);
      await User.create({
        username: req.body.username,
        password: hash,
      });
      return res.status(200).json({ message: "User registered successfully" });
    } catch (error: any) {
      console.log(`Error during registration: ${error}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login

router.post(
  "/login",
  body("username").trim().escape(),
  body("password").escape(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user: IUser | null = await User.findOne({
        username: req.body.username,
      });
      //console.log(user)
      if (!user) {
        return res.status(403).json({ message: "Login failed" });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const jwtPayload: JwtPayload = {
          id: user._id,
          username: user.username,
        };
        const token: string = jwt.sign(
          jwtPayload,
          process.env.SECRET as string,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ success: true, token });
      }
      return res.status(401).json({ message: "Login failed" });
    } catch (error: any) {
      console.log(`Error during login: ${error}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/list", validateToken, async (req: Request, res: Response) => {
  try {
    const listOfUsers: IUser[] | null = await User.find();
    return res.status(200).json(listOfUsers);
  } catch (error: any) {
    console.log("Erroe while trying to fetch users", error);
    return res
      .status(500)
      .json({ message: "Erroe while trying to fetch users" });
  }
});

export default router;
