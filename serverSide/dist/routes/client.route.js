"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_contoller_1 = require("../controllers/client.contoller");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const clientRouter = (0, express_1.Router)();
// Public route - anyone can view clients
clientRouter.get("/", client_contoller_1.getAllClients);
// Admin-only routes - require authentication and admin role
clientRouter.post("/", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, client_contoller_1.createClient);
clientRouter.put("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, client_contoller_1.updateClient);
clientRouter.patch("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, client_contoller_1.updateClient);
clientRouter.delete("/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, client_contoller_1.deleteClient);
exports.default = clientRouter;
