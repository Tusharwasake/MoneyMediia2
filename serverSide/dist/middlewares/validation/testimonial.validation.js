"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTestimonial = void 0;
const express_validator_1 = require("express-validator");
exports.validateTestimonial = [
    (0, express_validator_1.body)("content")
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Content must be between 10 and 1000 characters"),
    (0, express_validator_1.body)("clientName")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Client name must be between 2 and 100 characters"),
    (0, express_validator_1.body)("clientPosition")
        .trim()
        .isLength({ max: 100 })
        .withMessage("Client position must not exceed 100 characters"),
    (0, express_validator_1.body)("clientCompany")
        .trim()
        .isLength({ max: 100 })
        .withMessage("Client company must not exceed 100 characters"),
    (0, express_validator_1.body)("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),
    (0, express_validator_1.body)("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "error",
                errors: errors.array(),
            });
        }
        next();
    },
];
