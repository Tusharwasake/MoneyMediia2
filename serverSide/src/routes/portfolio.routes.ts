// src/routes/portfolio.routes.ts
import { Router } from "express";
import portfolioController from "../controllers/portfolio.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

// Public routes
router.get("/", portfolioController.getAllPortfolioItems);
router.get("/featured", portfolioController.getFeaturedPortfolioItems);
router.get("/latest", portfolioController.getLatestPortfolioItems);
router.get("/type/:type", portfolioController.getPortfolioItemsByType);
router.get(
  "/category/:category",
  portfolioController.getPortfolioItemsByCategory
);
router.get(
  "/industry/:industry",
  portfolioController.getPortfolioItemsByIndustry
);
router.get("/stats", portfolioController.getPortfolioStats);
router.get("/search", portfolioController.searchPortfolioItems);
router.get("/blogs", portfolioController.getBlogPosts);
router.get("/blog/:id/related", portfolioController.getRelatedBlogPosts);
router.get("/videos", portfolioController.getVideos);
router.get("/videos/duration", portfolioController.getVideosByDuration);
router.get("/:id", portfolioController.getPortfolioItemById);

// Protected routes for admin only
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  portfolioController.createPortfolioItem
);
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  portfolioController.updatePortfolioItem
);
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  portfolioController.deletePortfolioItem
);

export default router;
