"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
// Register User (can be used for admin if role is passed)
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role = "user" } = req.body;
        const existing = yield User_model_1.default.findOne({ email });
        if (existing) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_model_1.default.create({ name, email, password: hashed, role });
        res.status(201).json({
            message: "User created",
            user: { id: user._id, name, email, role },
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.register = register;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_model_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({
            token,
            user: { id: user._id, name: user.name, role: user.role },
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.login = login;
