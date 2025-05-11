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
exports.getPortfolioStats = exports.getLatestPortfolioItems = exports.getVideosByDuration = exports.getVideos = exports.getRelatedBlogPosts = exports.getBlogPosts = exports.searchPortfolioItems = exports.getFeaturedPortfolioItems = exports.deletePortfolioItem = exports.updatePortfolioItem = exports.getPortfolioItemById = exports.getPortfolioItemsByIndustry = exports.getPortfolioItemsByCategory = exports.getPortfolioItemsByType = exports.getAllPortfolioItems = exports.createPortfolioItem = void 0;
const PortfolioItem_model_1 = __importDefault(require("../models/PortfolioItem.model"));
const appError_1 = require("../utils/appError");
const catchAsync_1 = require("../utils/catchAsync");
// Create a new portfolio item
exports.createPortfolioItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract all possible fields from the request body
    const { type, title, category, client, thumbnail, videoUrl, industry, duration, author, readTime, publishDate, content, blogUrl, excerpt, description, featured, tags, } = req.body;
    // Create the portfolio item with all applicable fields
    const portfolioItem = yield PortfolioItem_model_1.default.create({
        type,
        title,
        category,
        client,
        thumbnail,
        videoUrl,
        industry,
        duration,
        author,
        readTime,
        publishDate,
        content,
        blogUrl,
        excerpt,
        description,
        featured: featured || false,
        tags: tags || [],
    });
    res.status(201).json({
        status: "success",
        data: {
            portfolioItem,
        },
    });
}));
// Get all portfolio items
exports.getAllPortfolioItems = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioItems = yield PortfolioItem_model_1.default.find().sort("-createdAt");
    res.status(200).json({
        status: "success",
        results: portfolioItems.length,
        data: {
            portfolioItems,
        },
    });
}));
// Get portfolio items by type
exports.getPortfolioItemsByType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    // Validate type
    if (!["video", "blog", "case-study", "image"].includes(type)) {
        return next(new appError_1.AppError("Invalid portfolio item type", 400));
    }
    const portfolioItems = yield PortfolioItem_model_1.default.find({ type }).sort("-createdAt");
    res.status(200).json({
        status: "success",
        results: portfolioItems.length,
        data: {
            portfolioItems,
        },
    });
}));
// Get portfolio items by category
exports.getPortfolioItemsByCategory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    const portfolioItems = yield PortfolioItem_model_1.default.find({ category }).sort("-createdAt");
    res.status(200).json({
        status: "success",
        results: portfolioItems.length,
        data: {
            portfolioItems,
        },
    });
}));
// Get portfolio items by industry
exports.getPortfolioItemsByIndustry = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { industry } = req.params;
    const portfolioItems = yield PortfolioItem_model_1.default.find({ industry }).sort("-createdAt");
    res.status(200).json({
        status: "success",
        results: portfolioItems.length,
        data: {
            portfolioItems,
        },
    });
}));
// Get a single portfolio item by ID
exports.getPortfolioItemById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const portfolioItem = yield PortfolioItem_model_1.default.findOne({
        someOtherField: "data",
    });
    if (!portfolioItem) {
        return next(new appError_1.AppError("No portfolio item found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            portfolioItem,
        },
    });
}));
// Update a portfolio item
exports.updatePortfolioItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    const portfolioItem = yield PortfolioItem_model_1.default.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    if (!portfolioItem) {
        return next(new appError_1.AppError("No portfolio item found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            portfolioItem,
        },
    });
}));
// Delete a portfolio item
exports.deletePortfolioItem = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const portfolioItem = yield PortfolioItem_model_1.default.findByIdAndDelete(id);
    if (!portfolioItem) {
        return next(new appError_1.AppError("No portfolio item found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
// Get featured portfolio items
exports.getFeaturedPortfolioItems = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 6;
    const portfolioItems = yield PortfolioItem_model_1.default.find({ featured: true })
        .sort("-createdAt")
        .limit(limit);
    res.status(200).json({
        status: "success",
        results: portfolioItems.length,
        data: {
            portfolioItems,
        },
    });
}));
// Search portfolio items
exports.searchPortfolioItems = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
        return next(new appError_1.AppError("Search query is required", 400));
    }
    const portfolioItems = yield PortfolioItem_model_1.default.find({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { industry: { $regex: query, $options: "i" } },
            { client: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
            { excerpt: { $regex: query, $options: "i" } },
        ],
    }).sort("-createdAt");
    res.status(200).json({
        status: "success",
        results: portfolioItems.length,
        data: {
            portfolioItems,
        },
    });
}));
// Get blog posts
exports.getBlogPosts = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 10;
    const blogPosts = yield PortfolioItem_model_1.default.find({ type: "blog" })
        .sort("-publishDate -createdAt")
        .limit(limit);
    res.status(200).json({
        status: "success",
        results: blogPosts.length,
        data: {
            blogPosts,
        },
    });
}));
// Get related blog posts
exports.getRelatedBlogPosts = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // First find the blog post to get its category and industry
    const blogPost = yield PortfolioItem_model_1.default.findOne({ someOtherField: "data" });
    if (!blogPost || blogPost.type !== "blog") {
        return next(new appError_1.AppError("No blog post found with that ID", 404));
    }
    // Find related blog posts with the same category or industry,
    // excluding the original post
    const relatedPosts = yield PortfolioItem_model_1.default.find({
        _id: { $ne: id },
        type: "blog",
        $or: [{ category: blogPost.category }, { industry: blogPost.industry }],
    })
        .sort("-publishDate")
        .limit(3);
    res.status(200).json({
        status: "success",
        results: relatedPosts.length,
        data: {
            relatedPosts,
        },
    });
}));
// Get videos
exports.getVideos = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 10;
    const videos = yield PortfolioItem_model_1.default.find({ type: "video" })
        .sort("-createdAt")
        .limit(limit);
    res.status(200).json({
        status: "success",
        results: videos.length,
        data: {
            videos,
        },
    });
}));
// Get videos by duration range
exports.getVideosByDuration = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { minDuration, maxDuration } = req.query;
    // Convert duration strings to seconds for comparison
    const convertToSeconds = (timeStr) => {
        const parts = timeStr.split(":").map(Number);
        if (parts.length === 2) {
            // MM:SS format
            return parts[0] * 60 + parts[1];
        }
        else if (parts.length === 3) {
            // HH:MM:SS format
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return 0;
    };
    // Find all videos
    const allVideos = yield PortfolioItem_model_1.default.find({ type: "video" }).sort("-createdAt");
    // Filter by duration if provided
    const filteredVideos = allVideos.filter((video) => {
        if (!video.duration)
            return true;
        const durationSeconds = convertToSeconds(video.duration);
        if (minDuration && maxDuration) {
            return (durationSeconds >= convertToSeconds(minDuration) &&
                durationSeconds <= convertToSeconds(maxDuration));
        }
        else if (minDuration) {
            return durationSeconds >= convertToSeconds(minDuration);
        }
        else if (maxDuration) {
            return durationSeconds <= convertToSeconds(maxDuration);
        }
        return true;
    });
    res.status(200).json({
        status: "success",
        results: filteredVideos.length,
        data: {
            videos: filteredVideos,
        },
    });
}));
// Get latest portfolio items
exports.getLatestPortfolioItems = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 6;
    const portfolioItems = yield PortfolioItem_model_1.default.find()
        .sort("-createdAt")
        .limit(limit);
    res.status(200).json({
        status: "success",
        results: portfolioItems.length,
        data: {
            portfolioItems,
        },
    });
}));
// Get portfolio statistics
exports.getPortfolioStats = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const [totalCount, videoCount, blogCount, caseStudyCount, imageCount, categoryCounts, industryCounts,] = yield Promise.all([
        PortfolioItem_model_1.default.countDocuments(),
        PortfolioItem_model_1.default.countDocuments({ type: "video" }),
        PortfolioItem_model_1.default.countDocuments({ type: "blog" }),
        PortfolioItem_model_1.default.countDocuments({ type: "case-study" }),
        PortfolioItem_model_1.default.countDocuments({ type: "image" }),
        PortfolioItem_model_1.default.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]),
        PortfolioItem_model_1.default.aggregate([
            { $group: { _id: "$industry", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]),
    ]);
    res.status(200).json({
        status: "success",
        data: {
            stats: {
                total: totalCount,
                byType: {
                    video: videoCount,
                    blog: blogCount,
                    caseStudy: caseStudyCount,
                    image: imageCount,
                },
                byCategory: categoryCounts.reduce((acc, { _id, count }) => {
                    if (_id)
                        acc[_id] = count;
                    return acc;
                }, {}),
                byIndustry: industryCounts.reduce((acc, { _id, count }) => {
                    if (_id)
                        acc[_id] = count;
                    return acc;
                }, {}),
            },
        },
    });
}));
exports.default = {
    createPortfolioItem: exports.createPortfolioItem,
    getAllPortfolioItems: exports.getAllPortfolioItems,
    getPortfolioItemsByType: exports.getPortfolioItemsByType,
    getPortfolioItemsByCategory: exports.getPortfolioItemsByCategory,
    getPortfolioItemsByIndustry: exports.getPortfolioItemsByIndustry,
    getPortfolioItemById: exports.getPortfolioItemById,
    updatePortfolioItem: exports.updatePortfolioItem,
    deletePortfolioItem: exports.deletePortfolioItem,
    getFeaturedPortfolioItems: exports.getFeaturedPortfolioItems,
    searchPortfolioItems: exports.searchPortfolioItems,
    getBlogPosts: exports.getBlogPosts,
    getRelatedBlogPosts: exports.getRelatedBlogPosts,
    getVideos: exports.getVideos,
    getVideosByDuration: exports.getVideosByDuration,
    getLatestPortfolioItems: exports.getLatestPortfolioItems,
    getPortfolioStats: exports.getPortfolioStats,
};
