// src/controllers/ContactController.ts
import { Request, Response } from "express";
import Contact, { serviceTypes } from "../models/Contact.model";
import EmailService from "../services/email.service";

export const submitContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get form data from request body
    const { name, email, companyName, serviceOfInterest, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
      return;
    }

    // Create contact in database
    const contact = await Contact.create({
      name,
      email,
      companyName,
      serviceOfInterest,
      message,
    });

    // Send admin notification email
    await EmailService.sendContactNotification(contact);

    // Return success response
    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
    return;
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
    return;
  }
};
