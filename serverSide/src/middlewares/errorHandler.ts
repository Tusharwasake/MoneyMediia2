// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let status = "error";
  let message = "Something went wrong";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }

  // Development error response
  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status,
      message,
      error: err,
      stack: err.stack,
    });
  }
  // Production error response
  else {
    // Operational error (trusted)
    if (err instanceof AppError && err.isOperational) {
      res.status(statusCode).json({
        status,
        message,
      });
    }
    // Programming or unknown error (don't leak details)
    else {
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};
