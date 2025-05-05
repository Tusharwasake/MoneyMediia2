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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedTestimonials = exports.deleteTestimonial = exports.updateTestimonial = exports.getTestimonialById = exports.getAllTestimonials = exports.createTestimonial = void 0;
const testimonials_model_1 = require("../models/testimonials.model");
const appError_1 = require("../utils/appError");
const catchAsync_1 = require("../utils/catchAsync");
// Create a new testimonial
exports.createTestimonial = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, clientName, clientPosition, clientCompany, rating, imageUrl, } = req.body;
    const testimonial = yield testimonials_model_1.Testimonial.create({
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
}));
// Get all active testimonials
exports.getAllTestimonials = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const testimonials = yield testimonials_model_1.Testimonial.find({ isActive: true }).sort("-createdAt");
    res.status(200).json({
        status: "success",
        results: testimonials.length,
        data: {
            testimonials,
        },
    });
}));
// Get a single testimonial by ID
exports.getTestimonialById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const testimonial = yield testimonials_model_1.Testimonial.findById(id);
    if (!testimonial) {
        return next(new appError_1.AppError("No testimonial found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            testimonial,
        },
    });
}));
// Update a testimonial
exports.updateTestimonial = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    const testimonial = yield testimonials_model_1.Testimonial.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    if (!testimonial) {
        return next(new appError_1.AppError("No testimonial found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            testimonial,
        },
    });
}));
// Delete a testimonial (soft delete)
exports.deleteTestimonial = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const testimonial = yield testimonials_model_1.Testimonial.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!testimonial) {
        return next(new appError_1.AppError("No testimonial found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
// Get featured testimonials (for homepage)
exports.getFeaturedTestimonials = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 3;
    const testimonials = yield testimonials_model_1.Testimonial.find({ isActive: true })
        .sort("-rating -createdAt")
        .limit(limit);
    res.status(200).json({
        status: "success",
        results: testimonials.length,
        data: {
            testimonials,
        },
    });
}));
