import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  content: string;
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  rating?: number;
  isActive: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    clientPosition: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    clientCompany: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes
testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ createdAt: -1 });

export const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  testimonialSchema
);
