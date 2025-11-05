import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ErrorConstructor } from "./errors.js";

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const bearerToken = request.headers.authorization;
    const token = bearerToken?.split(" ")[1];

    if (bearerToken?.startsWith("Bearer") && token) {
      const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
      request.user = decodedToken as unknown as { id: string; role: string };
      next();
    } else {
      next(new ErrorConstructor("Unauthorized access", 401));
    }
  } catch (e) {
    next(new ErrorConstructor("Invalid or expired token", 401));
  }
}
