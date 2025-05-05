import { Router } from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/services.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const serviceRouter = Router();

// Public routes
serviceRouter.get("/", getAllServices); // GET all services
serviceRouter.get("/:id", getServiceById); // GET one service by ID

// Admin-only routes
serviceRouter.post("/", isAuthenticated, isAdmin, createService); // CREATE service
serviceRouter.put("/:id", isAuthenticated, isAdmin, updateService); // UPDATE service
serviceRouter.patch("/:id", isAuthenticated, isAdmin, updateService); // Optional: PATCH
serviceRouter.delete("/:id", isAuthenticated, isAdmin, deleteService); // DELETE service

export default serviceRouter;
