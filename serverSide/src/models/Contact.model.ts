// src/models/Contact.ts
import mongoose from "mongoose";

// Financial service types
export const serviceTypes = [
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
const contactSchema = new mongoose.Schema({
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
    enum: serviceTypes,
    required: true,
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

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
