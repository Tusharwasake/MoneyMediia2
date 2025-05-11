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
exports.submitContact = void 0;
const Contact_model_1 = __importDefault(require("../models/Contact.model"));
const email_service_1 = __importDefault(require("../services/email.service"));
const submitContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const contact = yield Contact_model_1.default.create({
            name,
            email,
            companyName,
            serviceOfInterest,
            message,
        });
        // Send admin notification email
        yield email_service_1.default.sendContactNotification(contact);
        // Return success response
        res.status(201).json({
            success: true,
            message: "Your message has been sent successfully!",
        });
        return;
    }
    catch (error) {
        console.error("Contact submission error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
        return;
    }
});
exports.submitContact = submitContact;
