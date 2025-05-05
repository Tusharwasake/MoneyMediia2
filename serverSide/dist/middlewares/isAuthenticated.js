"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const isAuthenticated = (req, res, next) => {
    var _a;
    // Ensure the return type is `void`
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token required" }); // Send a response and exit early
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Type assertion here
        req.user = decoded;
        next(); // Call next() if the token is valid
    }
    catch (_b) {
        res.status(401).json({ message: "Invalid token" }); // Send a response and exit early
    }
};
exports.isAuthenticated = isAuthenticated;
