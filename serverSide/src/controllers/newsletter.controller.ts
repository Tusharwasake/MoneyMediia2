// controllers/newsletter.controller.ts
import { Request, Response } from "express";
import { Newsletter } from "../models/newsletter.model"; // your Mongoose model

export const subscribeToNewsletter = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      res.status(409).json({ message: "Email already subscribed" });
      return;
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Subscription failed", error: err });
  }
};
