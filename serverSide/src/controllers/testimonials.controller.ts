// controllers/testimonials.controller.ts
import { Request, Response, NextFunction } from "express";
import { Testimonial } from "../models/testimonials.model";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

// Create a new testimonial
export const createTestimonial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      content,
      clientName,
      clientPosition,
      clientCompany,
      rating,
      imageUrl,
    } = req.body;

    const testimonial = await Testimonial.create({
      content,
      clientName,
      clientPosition,
      clientCompany,
      rating,
      imageUrl,
    });

    res.status(201).json({
      status: "success",
      data: {
        testimonial,
      },
    });
  }
);

// Get all active testimonials
export const getAllTestimonials = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const testimonials = await Testimonial.find({ isActive: true }).sort(
      "-createdAt"
    );

    res.status(200).json({
      status: "success",
      results: testimonials.length,
      data: {
        testimonials,
      },
    });
  }
);

// Get a single testimonial by ID
export const getTestimonialById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return next(new AppError("No testimonial found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        testimonial,
      },
    });
  }
);

// Update a testimonial
export const updateTestimonial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return next(new AppError("No testimonial found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        testimonial,
      },
    });
  }
);

// Delete a testimonial (soft delete)
export const deleteTestimonial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!testimonial) {
      return next(new AppError("No testimonial found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

// Get featured testimonials (for homepage)
export const getFeaturedTestimonials = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 3;

    const testimonials = await Testimonial.find({ isActive: true })
      .sort("-rating -createdAt")
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: testimonials.length,
      data: {
        testimonials,
      },
    });
  }
);
