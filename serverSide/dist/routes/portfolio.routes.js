"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/portfolio.routes.ts
const express_1 = require("express");
const portfolio_controller_1 = __importDefault(require("../controllers/portfolio.controller"));
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = (0, express_1.Router)();
// Public routes
router.get("/", portfolio_controller_1.default.getAllPortfolioItems);
router.get("/featured", portfolio_controller_1.default.getFeaturedPortfolioItems);
router.get("/latest", portfolio_controller_1.default.getLatestPortfolioItems);
router.get("/type/:type", portfolio_controller_1.default.getPortfolioItemsByType);
router.get("/category/:category", portfolio_controller_1.default.getPortfolioItemsByCategory);
router.get("/industry/:industry", portfolio_controller_1.default.getPortfolioItemsByIndustry);
router.get("/stats", portfolio_controller_1.default.getPortfolioStats);
router.get("/search", portfolio_controller_1.default.searchPortfolioItems);
router.get("/blogs", portfolio_controller_1.default.getBlogPosts);
router.get("/blog/:id/related", portfolio_controller_1.default.getRelatedBlogPosts);
router.get("/videos", portfolio_controller_1.default.getVideos);
router.get("/videos/duration", portfolio_controller_1.default.getVideosByDuration);
router.get("/:id", portfolio_controller_1.default.getPortfolioItemById);
// Protected routes for admin only
router.post("/", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, portfolio_controller_1.default.createPortfolioItem);
router.put("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, portfolio_controller_1.default.updatePortfolioItem);
router.delete("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, portfolio_controller_1.default.deletePortfolioItem);
exports.default = router;
