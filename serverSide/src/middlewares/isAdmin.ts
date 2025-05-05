import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./isAuthenticated";

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied: Admins only" });
    return; // Ensure we don't accidentally call `next()` after sending response
  }
  next();
};
