// src/controllers/portfolio.controller.ts
import { Request, Response, NextFunction } from "express";
import PortfolioItem from "../models/PortfolioItem.model";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { AuthenticatedRequest } from "../middlewares/isAuthenticated";

// Create a new portfolio item
export const createPortfolioItem = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Extract all possible fields from the request body
    const {
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
      featured,
      tags,
    } = req.body;

    // Create the portfolio item with all applicable fields
    const portfolioItem = await PortfolioItem.create({
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
  }
);

// Get all portfolio items
export const getAllPortfolioItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const portfolioItems = await PortfolioItem.find().sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: portfolioItems.length,
      data: {
        portfolioItems,
      },
    });
  }
);

// Get portfolio items by type
export const getPortfolioItemsByType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.params;

    // Validate type
    if (!["video", "blog", "case-study", "image"].includes(type)) {
      return next(new AppError("Invalid portfolio item type", 400));
    }

    const portfolioItems = await PortfolioItem.find({ type }).sort(
      "-createdAt"
    );

    res.status(200).json({
      status: "success",
      results: portfolioItems.length,
      data: {
        portfolioItems,
      },
    });
  }
);

// Get portfolio items by category
export const getPortfolioItemsByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.params;

    const portfolioItems = await PortfolioItem.find({ category }).sort(
      "-createdAt"
    );

    res.status(200).json({
      status: "success",
      results: portfolioItems.length,
      data: {
        portfolioItems,
      },
    });
  }
);

// Get portfolio items by industry
export const getPortfolioItemsByIndustry = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { industry } = req.params;

    const portfolioItems = await PortfolioItem.find({ industry }).sort(
      "-createdAt"
    );

    res.status(200).json({
      status: "success",
      results: portfolioItems.length,
      data: {
        portfolioItems,
      },
    });
  }
);

// Get a single portfolio item by ID
export const getPortfolioItemById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const portfolioItem = await PortfolioItem.findOne({
      someOtherField: "data",
    });

    if (!portfolioItem) {
      return next(new AppError("No portfolio item found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        portfolioItem,
      },
    });
  }
);

// Update a portfolio item
export const updatePortfolioItem = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    const portfolioItem = await PortfolioItem.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!portfolioItem) {
      return next(new AppError("No portfolio item found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        portfolioItem,
      },
    });
  }
);

// Delete a portfolio item
export const deletePortfolioItem = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const portfolioItem = await PortfolioItem.findByIdAndDelete(id);

    if (!portfolioItem) {
      return next(new AppError("No portfolio item found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

// Get featured portfolio items
export const getFeaturedPortfolioItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 6;

    const portfolioItems = await PortfolioItem.find({ featured: true })
      .sort("-createdAt")
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: portfolioItems.length,
      data: {
        portfolioItems,
      },
    });
  }
);

// Search portfolio items
export const searchPortfolioItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return next(new AppError("Search query is required", 400));
    }

    const portfolioItems = await PortfolioItem.find({
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
  }
);

// Get blog posts
export const getBlogPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 10;

    const blogPosts = await PortfolioItem.find({ type: "blog" })
      .sort("-publishDate -createdAt")
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: blogPosts.length,
      data: {
        blogPosts,
      },
    });
  }
);

// Get related blog posts
export const getRelatedBlogPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // First find the blog post to get its category and industry
    const blogPost = await PortfolioItem.findOne({ someOtherField: "data" });

    if (!blogPost || blogPost.type !== "blog") {
      return next(new AppError("No blog post found with that ID", 404));
    }

    // Find related blog posts with the same category or industry,
    // excluding the original post
    const relatedPosts = await PortfolioItem.find({
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
  }
);

// Get videos
export const getVideos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 10;

    const videos = await PortfolioItem.find({ type: "video" })
      .sort("-createdAt")
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: videos.length,
      data: {
        videos,
      },
    });
  }
);

// Get videos by duration range
export const getVideosByDuration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { minDuration, maxDuration } = req.query;

    // Convert duration strings to seconds for comparison
    const convertToSeconds = (timeStr: string) => {
      const parts = timeStr.split(":").map(Number);
      if (parts.length === 2) {
        // MM:SS format
        return parts[0] * 60 + parts[1];
      } else if (parts.length === 3) {
        // HH:MM:SS format
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
      return 0;
    };

    // Find all videos
    const allVideos = await PortfolioItem.find({ type: "video" }).sort(
      "-createdAt"
    );

    // Filter by duration if provided
    const filteredVideos = allVideos.filter((video) => {
      if (!video.duration) return true;

      const durationSeconds = convertToSeconds(video.duration);

      if (minDuration && maxDuration) {
        return (
          durationSeconds >= convertToSeconds(minDuration as string) &&
          durationSeconds <= convertToSeconds(maxDuration as string)
        );
      } else if (minDuration) {
        return durationSeconds >= convertToSeconds(minDuration as string);
      } else if (maxDuration) {
        return durationSeconds <= convertToSeconds(maxDuration as string);
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
  }
);

// Get latest portfolio items
export const getLatestPortfolioItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 6;

    const portfolioItems = await PortfolioItem.find()
      .sort("-createdAt")
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: portfolioItems.length,
      data: {
        portfolioItems,
      },
    });
  }
);

// Get portfolio statistics
export const getPortfolioStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const [
      totalCount,
      videoCount,
      blogCount,
      caseStudyCount,
      imageCount,
      categoryCounts,
      industryCounts,
    ] = await Promise.all([
      PortfolioItem.countDocuments(),
      PortfolioItem.countDocuments({ type: "video" }),
      PortfolioItem.countDocuments({ type: "blog" }),
      PortfolioItem.countDocuments({ type: "case-study" }),
      PortfolioItem.countDocuments({ type: "image" }),
      PortfolioItem.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      PortfolioItem.aggregate([
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
          byCategory: categoryCounts.reduce((acc: any, { _id, count }) => {
            if (_id) acc[_id] = count;
            return acc;
          }, {}),
          byIndustry: industryCounts.reduce((acc: any, { _id, count }) => {
            if (_id) acc[_id] = count;
            return acc;
          }, {}),
        },
      },
    });
  }
);

export default {
  createPortfolioItem,
  getAllPortfolioItems,
  getPortfolioItemsByType,
  getPortfolioItemsByCategory,
  getPortfolioItemsByIndustry,
  getPortfolioItemById,
  updatePortfolioItem,
  deletePortfolioItem,
  getFeaturedPortfolioItems,
  searchPortfolioItems,
  getBlogPosts,
  getRelatedBlogPosts,
  getVideos,
  getVideosByDuration,
  getLatestPortfolioItems,
  getPortfolioStats,
};
