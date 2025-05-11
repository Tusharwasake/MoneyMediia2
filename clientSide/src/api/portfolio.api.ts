// src/api/portfolio.api.ts

import api from "./axios";

// Define TypeScript interfaces
export interface PortfolioItem {
  _id?: string;
  id?: string; // Virtual field for compatibility
  type: string;
  title: string;
  category: string;
  client?: string;
  thumbnail: string;
  videoUrl?: string;
  blogUrl?: string;
  industry?: string;
  duration?: string;
  author?: string;
  readTime?: number;
  publishDate?: string;
  content?: string;
  description: string;
  excerpt?: string;
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  date?: string; // Virtual field for compatibility
}

// Define the API response structure
export interface PortfolioResponse {
  status: string;
  results?: number;
  data: {
    portfolioItems?: PortfolioItem[];
    portfolioItem?: PortfolioItem;
    blogPosts?: PortfolioItem[];
    relatedPosts?: PortfolioItem[];
    videos?: PortfolioItem[];
    stats?: {
      total: number;
      byType: {
        video: number;
        blog: number;
        caseStudy: number;
        image: number;
      };
      byCategory: Record<string, number>;
      byIndustry: Record<string, number>;
    };
  };
}

// Portfolio API Calls

// Fetch all portfolio items
export const getAllPortfolioItems = () => {
  return api.get<PortfolioResponse>("/portfolio");
};

// Fetch featured portfolio items
export const getFeaturedPortfolioItems = (limit: number = 6) => {
  return api.get<PortfolioResponse>(`/portfolio/featured?limit=${limit}`);
};

// Fetch latest portfolio items
export const getLatestPortfolioItems = (limit: number = 6) => {
  return api.get<PortfolioResponse>(`/portfolio/latest?limit=${limit}`);
};

// Fetch portfolio items by type
export const getPortfolioItemsByType = (type: string) => {
  return api.get<PortfolioResponse>(`/portfolio/type/${type}`);
};

// Fetch portfolio items by category
export const getPortfolioItemsByCategory = (category: string) => {
  return api.get<PortfolioResponse>(`/portfolio/category/${category}`);
};

// Fetch portfolio items by industry
export const getPortfolioItemsByIndustry = (industry: string) => {
  return api.get<PortfolioResponse>(`/portfolio/industry/${industry}`);
};

// Fetch a specific portfolio item by ID
export const getPortfolioItemById = (id: string) => {
  return api.get<PortfolioResponse>(`/portfolio/${id}`);
};

// Search portfolio items
export const searchPortfolioItems = (query: string) => {
  return api.get<PortfolioResponse>(
    `/portfolio/search?query=${encodeURIComponent(query)}`
  );
};

// Blog API Calls

// Fetch blog posts
export const getBlogPosts = (limit: number = 10) => {
  return api.get<PortfolioResponse>(`/portfolio/blogs?limit=${limit}`);
};

// Fetch related blog posts
export const getRelatedBlogPosts = (id: string) => {
  return api.get<PortfolioResponse>(`/portfolio/blog/${id}/related`);
};

// Video API Calls

// Fetch videos
export const getVideos = (limit: number = 10) => {
  return api.get<PortfolioResponse>(`/portfolio/videos?limit=${limit}`);
};

// Fetch videos by duration
export const getVideosByDuration = (
  minDuration?: string,
  maxDuration?: string
) => {
  let url = "/portfolio/videos/duration";
  const params = [];

  if (minDuration)
    params.push(`minDuration=${encodeURIComponent(minDuration)}`);
  if (maxDuration)
    params.push(`maxDuration=${encodeURIComponent(maxDuration)}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  return api.get<PortfolioResponse>(url);
};

// Statistics API Calls

// Fetch portfolio statistics
export const getPortfolioStats = () => {
  return api.get<PortfolioResponse>("/portfolio/stats");
};

// Admin API Calls

// Create a portfolio item (admin only)
export const createPortfolioItem = (
  data: Omit<PortfolioItem, "_id" | "id" | "createdAt" | "updatedAt">
) => {
  return api.post<PortfolioResponse>("/portfolio", data);
};

// Update a portfolio item (admin only)
export const updatePortfolioItem = (
  id: string,
  data: Partial<PortfolioItem>
) => {
  return api.put<PortfolioResponse>(`/portfolio/${id}`, data);
};

// Delete a portfolio item (admin only)
export const deletePortfolioItem = (id: string) => {
  return api.delete<PortfolioResponse>(`/portfolio/${id}`);
};

// Export all API functions
export default {
  getAllPortfolioItems,
  getFeaturedPortfolioItems,
  getLatestPortfolioItems,
  getPortfolioItemsByType,
  getPortfolioItemsByCategory,
  getPortfolioItemsByIndustry,
  getPortfolioItemById,
  searchPortfolioItems,
  getBlogPosts,
  getRelatedBlogPosts,
  getVideos,
  getVideosByDuration,
  getPortfolioStats,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
