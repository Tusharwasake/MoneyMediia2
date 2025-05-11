"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceTypes = void 0;
// src/models/Contact.ts
const mongoose_1 = __importDefault(require("mongoose"));
// Financial service types
exports.serviceTypes = [
    "Script & Blog Writing",
    "Infographics for Social & Ads",
    "End-to-End Video Production",
    "Language Translations & Dubbing",
    "Professional Shooting",
    "Creative Brand Shoots",
    "Audio Podcasts",
    "Corporate Videos",
];
// Contact schema
const contactSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    companyName: String,
    serviceOfInterest: {
        type: String,
        enum: exports.serviceTypes,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Contact = mongoose_1.default.model("Contact", contactSchema);
exports.default = Contact;
