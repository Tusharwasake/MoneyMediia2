"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/testimonial.routes.ts
const express_1 = require("express");
const testimonials_controller_1 = require("../controllers/testimonials.controller");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const testimonialRouter = (0, express_1.Router)();
// Public routes
testimonialRouter.get("/", testimonials_controller_1.getAllTestimonials); // GET all testimonials
testimonialRouter.get("/featured", testimonials_controller_1.getFeaturedTestimonials); // GET featured testimonials
testimonialRouter.get("/:id", testimonials_controller_1.getTestimonialById); // GET one testimonial by ID
// Admin-only routes
testimonialRouter.post("/", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, testimonials_controller_1.createTestimonial); // CREATE testimonial
testimonialRouter.put("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, testimonials_controller_1.updateTestimonial); // UPDATE testimonial
testimonialRouter.patch("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, testimonials_controller_1.updateTestimonial); // PATCH testimonial
testimonialRouter.delete("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, testimonials_controller_1.deleteTestimonial); // DELETE testimonial
exports.default = testimonialRouter;
