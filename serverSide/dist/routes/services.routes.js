"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_controller_1 = require("../controllers/services.controller");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const serviceRouter = (0, express_1.Router)();
// Public routes
serviceRouter.get("/", services_controller_1.getAllServices); // GET all services
serviceRouter.get("/:id", services_controller_1.getServiceById); // GET one service by ID
// Admin-only routes
serviceRouter.post("/", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, services_controller_1.createService); // CREATE service
serviceRouter.put("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, services_controller_1.updateService); // UPDATE service
serviceRouter.patch("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, services_controller_1.updateService); // Optional: PATCH
serviceRouter.delete("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, services_controller_1.deleteService); // DELETE service
exports.default = serviceRouter;
