import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateTestimonial = [
  body("content")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Content must be between 10 and 1000 characters"),

  body("clientName")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Client name must be between 2 and 100 characters"),

  body("clientPosition")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Client position must not exceed 100 characters"),

  body("clientCompany")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Client company must not exceed 100 characters"),

  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }
    next();
  },
];
