// routes/testimonial.routes.ts
import { Router } from "express";
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  getFeaturedTestimonials,
} from "../controllers/testimonials.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const testimonialRouter = Router();

// Public routes
testimonialRouter.get("/", getAllTestimonials); // GET all testimonials
testimonialRouter.get("/featured", getFeaturedTestimonials); // GET featured testimonials
testimonialRouter.get("/:id", getTestimonialById); // GET one testimonial by ID

// Admin-only routes
testimonialRouter.post("/", isAuthenticated, isAdmin, createTestimonial); // CREATE testimonial
testimonialRouter.put("/:id", isAuthenticated, isAdmin, updateTestimonial); // UPDATE testimonial
testimonialRouter.patch("/:id", isAuthenticated, isAdmin, updateTestimonial); // PATCH testimonial
testimonialRouter.delete("/:id", isAuthenticated, isAdmin, deleteTestimonial); // DELETE testimonial

export default testimonialRouter;
