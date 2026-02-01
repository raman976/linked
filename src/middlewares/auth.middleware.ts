import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

class AuthMiddleware {
  public static protect(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error("No token provided");
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { userId: string };

      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

export default AuthMiddleware;
