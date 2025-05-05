import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register User (can be used for admin if role is passed)
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role = "user" } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({
      message: "User created",
      user: { id: user._id, name, email, role },
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};
