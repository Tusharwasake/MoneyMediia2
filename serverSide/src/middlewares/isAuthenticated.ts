// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// export interface AuthenticatedRequest extends Request {
//   user?: any;
// }

// export const isAuthenticated = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Token required" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// // Define a more specific type for the decoded JWT
// interface DecodedToken extends JwtPayload {
//   userId: string; // example, use the actual fields from your JWT
// }

// export interface AuthenticatedRequest extends Request {
//   user?: DecodedToken; // Use the DecodedToken type here
// }

// export const isAuthenticated = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Token required" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken; // Type assertion here
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Define a more specific type for the decoded JWT
interface DecodedToken extends JwtPayload {
  userId: string; // example, use the actual fields from your JWT
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedToken; // Use the DecodedToken type here
}

export const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Ensure the return type is `void`
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token required" }); // Send a response and exit early
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken; // Type assertion here
    req.user = decoded;
    next(); // Call next() if the token is valid
  } catch {
    res.status(401).json({ message: "Invalid token" }); // Send a response and exit early
  }
};
