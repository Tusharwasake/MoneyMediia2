import { Router } from "express";
import {
  deleteClient,
  updateClient,
  createClient,
  getAllClients,
} from "../controllers/client.contoller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const clientRouter = Router();

// Public route - anyone can view clients
clientRouter.get("/", getAllClients);

// Admin-only routes - require authentication and admin role
clientRouter.post("/", isAuthenticated, isAdmin, createClient);
clientRouter.put("/:id", isAuthenticated, isAdmin, updateClient);
clientRouter.patch("/:id", isAuthenticated, isAdmin, updateClient);
clientRouter.delete("/:id", isAuthenticated, isAdmin, deleteClient);

export default clientRouter;
