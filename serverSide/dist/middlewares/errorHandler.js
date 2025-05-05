"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = require("../utils/appError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let status = "error";
    let message = "Something went wrong";
    if (err instanceof appError_1.AppError) {
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
        if (err instanceof appError_1.AppError && err.isOperational) {
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
exports.globalErrorHandler = globalErrorHandler;
