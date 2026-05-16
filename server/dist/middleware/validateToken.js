import jwt, {} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res
            .status(401)
            .json({ message: "Access denied, no Authorization header provided" });
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(400).json({
            message: "Invalid Authorization header format. Use: Bearer <token>",
        });
    }
    const secret = process.env.SECRET;
    if (!secret) {
        throw new Error("JWT SECRET is missing from environment variables");
    }
    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        return next();
    }
    catch (err) {
        return res
            .status(401)
            .json({ message: "Invalid or expired token", error: err.message });
    }
};
//# sourceMappingURL=validateToken.js.map