import type { Request, Response, NextFunction } from "express";
import { type JwtPayload } from "jsonwebtoken";
interface CustomRequest extends Request {
    user?: JwtPayload;
}
export declare const validateToken: (req: CustomRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=validateToken.d.ts.map